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
 if (orderId == undefined) {
     return reject("Invalid userId passed");
 } else {
   query = `SELECT orders.order_id as ord_id, orders.order_date as ord_date, orders.order_status as ord_status, 
   orders.user_id as usr_id, order_dtl.item_id as itm_id, order_dtl.item_ord_qty as itm_qty 
   FROM orders INNER JOIN order_dtl ON orders.order_id = order_dtl.order_id and order_dtl.usr_id =`+userId
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

//Get the user for a matching Username and pwd
function createOrder(orderDtl) {
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

module.exports = {
    getDb,
    initDb,
    getItems,
    getOrdersForUser,
    validateUser,
    createOrder
};