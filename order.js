var express = require('express')
const dbObj = require("./database");
var router = express.Router()

// define the item middleware
router.get(['/', '/:ordId'], function (req, res) {
    ordId = req.params.ordId
    console.log('during req:'+ordId);
    dbObj.getOrders(ordId).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in getOrders"}
        res.json(errtxt);
    })
})

// define the about route

module.exports = router