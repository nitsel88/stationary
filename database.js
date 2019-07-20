const assert = require("assert");
var mysql      = require("mysql");
const dbConfig = require("./databaseconfig");

let _db;

//initialize DB connection
function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    var connection = mysql.createConnection(dbConfig);

    connection.connect(function(err) {
     if (err) throw err;
    console.log("DB Connected!");
    _db = connection;
    return callback(null, _db)
  });
}

//Get DB instance
function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

//Get item details for item number
function getItems(itemNbr) {
 return new Promise((resolve, reject) => {
 const dbCon = getDb();
 console.log('itemNbr = ' + itemNbr)
 if (itemNbr == undefined) {
   query = 'SELECT * from items'
 } else {
   query = 'SELECT * from items where item_id='+itemNbr
 }
 dbCon.query(query,  (error, results) => {
     if (error)  {
         return reject(error);
     }
     return resolve(JSON.stringify(results));
  })
 })
}

//Get the orders for user
function getOrdersForUser(userId) {
 return new Promise((resolve, reject) => {
 const dbCon = getDb();
 console.log('user id = ' + userId)
 if (userId == undefined) {
     return reject("Invalid userId passed");
 } else {
   query = `SELECT orders.order_id as ord_id, orders.order_date as ord_date, orders.order_status as ord_status, 
   orders.order_total as ord_total, orders.user_id as usr_id, order_dtl.item_id as itm_id, order_dtl.item_ord_qty as itm_qty 
   FROM orders INNER JOIN order_dtl ON orders.order_id = order_dtl.order_id and orders.user_id =\'`+ userId + '\''

   console.log(query);
 }
 dbCon.query(query, (error, results) => {
     if (error)  {
         return reject(error);
     }
     return resolve(JSON.stringify(results));
  })
 })
}

//Get the user for a matching Username and pwd
function validateUser(authDtl) {
 return new Promise((resolve, reject) => {
 const dbCon = getDb();
 if (authDtl.uName == undefined || authDtl.pwd == undefined) {
     return reject("Invalid userId and password passed");
 } else {
   query = 'SELECT user_id FROM users WHERE user_name="' + authDtl.uName + '" ' + 'and pwd="' + authDtl.pwd + '"';
 }
 console.log(query);

 dbCon.query(query, (error, results) => {
     if (error)  {
         return reject(error);
     }
     return resolve(JSON.stringify(results));
  })
 })
}

function getMaxOrdId() {
   return new Promise((resolve, reject) => {
     const dbCon = getDb(); 
     maxQuery = 'SELECT MAX(order_id) as max_ord_id FROM orders';
    dbCon.query(maxQuery, (error, results) => {
     if (error)  {
         return reject(error);
     }
     return resolve(results);
    })
 })
}   

//create order
function createOrder(ord) {
//Get the maximum order id from table
    return new Promise((resolve, reject) => {
    
    getMaxOrdId().then(maxOrderId => { 
    const dbCon = getDb();
    orderId = maxOrderId[0].max_ord_id + 1
    //query for order 
    ordQuery = `INSERT INTO orders (order_id, order_date, order_status, user_id, order_total) 
    VALUES (` +  orderId + `,CURRENT_TIMESTAMP, 1 ,"` + ord.user_id + `",` + ord.order_total + `)` ;
    //query for order details
    ordDtlQuery = 'INSERT INTO order_dtl (order_id, item_id, item_ord_qty) VALUES'
    ord.ordDtls.forEach(ordDtl => {
     ordDtlQuery += "(" + orderId + ", " + ordDtl.item_id + ", "+  ordDtl.item_qty  + "),"
    })
    //remove comma
    ordDtlQuery = ordDtlQuery.slice(0, -1)

      console.log(ordQuery);
      console.log(ordDtlQuery);
    
     dbCon.query(ordQuery, (error, results) => {
         if (error)  {
             return reject("Error inserting order info");
             console.log("Error inserting order info");
         }
          dbCon.query(ordDtlQuery, (error, results) => {
           if (error)  {
            return reject("Error inserting order details info");
            console.log("Error inserting order details info");
           }
           orderResult = {order_id: orderId, ret_Code: 0}
           return resolve(JSON.stringify(orderResult));
       })
      })
    }, () => {
        return reject("Error getting current maximum order id from orders table");
    })
 })
  

}

module.exports = {
    getDb,
    initDb,
    getItems,
    getOrdersForUser,
    validateUser,
    getMaxOrdId,
    createOrder    
};