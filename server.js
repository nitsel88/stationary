const app = require('express')();
const dbObj = require('./database');
const item = require('./item')
const order = require('./order')

const port = 3001;

app.use("/items", item);
app.use("/orders", order);

dbObj.initDb(() => {
        app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port: " + port);
    });
});

