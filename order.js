var express = require('express')
const dbObj = require("./database");
var router = express.Router()

// define the item middleware
router.get(['/:userId'], function (req, res) {
    ordId = req.params.ordId
    userId = req.query.userId

    dbObj.getOrdersForUser(userId).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in getOrdersForUser"}
        res.json(errtxt);
    })
})

module.exports = router