var express = require('express')
const dbObj = require("./database");
var router = express.Router()

//Get max order id
router.get('/getMaxOrderId', function (req, res) {

    dbObj.getMaxOrdId().then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in getMaxOrdId"}
        res.json(errtxt);
    })
})

//handle new order post
router.post('/', function (req, res) {
    console.log("order creation request received")
    dbObj.createOrder(req.body).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in createOrder"}
        res.json(errtxt);
    })
})

// Get list of orders for a user
router.get('/user/:userId', function (req, res) {
    userId = req.params.userId
    dbObj.getOrdersForUser(userId).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in getOrdersForUser"}
        res.json(errtxt);
    })
})

module.exports = router