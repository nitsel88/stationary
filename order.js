var express = require('express')
const dbObj = require("./database");
var router = express.Router()

router.get('/getMaxOrderId', function (req, res) {

    dbObj.getMaxOrdId().then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in getMaxOrdId"}
        res.json(errtxt);
    })
})


router.post('/', function (req, res) {

    dbObj.createOrder().then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in createOrder"}
        res.json(errtxt);
    })
})

// define the item middleware
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