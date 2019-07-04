var express = require('express')
const dbObj = require("./database");
var router = express.Router()

// define the item middleware
router.get(['/', '/:itemNbr'], function (req, res) {
    itemNbr = req.params.itemNbr
    console.log('during req:'+itemNbr);
    dbObj.getItems(itemNbr).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in getItems"}
        res.json(errtxt);
    })
})

// define the about route

module.exports = router