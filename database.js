const assert = require("assert");
var mysql      = require("mysql");
const dbConfig = require("./databaseconfig");

let _db;

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

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

function getItems(itemNbr) {
 return new Promise((resolve, reject) => {
 const dbCon = getDb();
 console.log('itemNbr = ' + itemNbr)
 if (itemNbr == undefined) {
   query = 'SELECT * from items'
 } else {
   query = 'SELECT * from items where item_nbr='+itemNbr
 }

 dbCon.query(query,  (error, results) => {
     if (error)  {
         return reject(error);
     }
     return resolve(JSON.stringify(results));
  })
 })
}


function getOrders(orderId) {
 return new Promise((resolve, reject) => {
 const dbCon = getDb();
 console.log('orderID = ' + orderId)
 if (orderId == undefined) {
   query = `SELECT orders.order_id as id, orders.order_date as date, orders.order_status as status, 
   orders.userid as user, order_dtl.item_id as item, order_dtl.item_ord_qty as qty 
   FROM orders INNER JOIN order_dtl ON orders.order_id = order_dtl.order_id`
 } else {
   query = `SELECT orders.order_id as id, orders.order_date as date, orders.order_status as status, 
   orders.userid as user, order_dtl.item_id as item, order_dtl.item_ord_qty as qty 
   FROM orders INNER JOIN order_dtl ON orders.order_id = order_dtl.order_id WHERE orders.order_id=`+orderId
 }

 dbCon.query(query,  (error, results) => {
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
    getOrders
};