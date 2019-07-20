var express = require('express')
const dbObj = require("./database");
var router = express.Router()

// define the user middleware
router.post('/verify', function (req, res) {

    console.log(req.body);

    dbObj.validateUser(req.body).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in validateUser"}
        res.json(errtxt);
    })
})

module.exports = router