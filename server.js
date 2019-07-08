const express = require('express');
const app = express();
const dbObj = require('./database');
const item = require('./item')
const order = require('./order')
const user = require('./user')

const port = 3001;
app.use(express.urlencoded({extended: true}))
app.use("/items", item);
app.use("/orders", order);
app.use("/users", user);


dbObj.initDb(() => {
        app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port: " + port);
    });
});

process.on( 'SIGINT', function() {

  const dbCon = dbObj.getDb();
  dbCon.end(function(err) {
      if(err) {
        console.log('Error closing DB connection- Dont terminate')
      }
        console.log('DB disconnected - you can terminate if you wish')
  });
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

  process.exit( );
})

