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

