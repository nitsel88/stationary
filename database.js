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

function getItems() {
 const dbCon = getDb();
 dbCon.query('SELECT * from items',  (error, results, fields) => {
     console.log('inside getItems');
     if (error) throw error;
     console.log(results[0])
     return JSON.stringify(results);
  })
}

module.exports = {
    getDb,
    initDb,
    getItems
};