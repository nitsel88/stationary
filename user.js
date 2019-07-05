var express = require('express')
const dbObj = require("./database");
var router = express.Router()

// define the user middleware
router.post('/verify', function (req, res) {

    console.log(req.body);

    authDtl = {
      uName : req.body.userName,
      pwd : req.body.pwd
    }

    dbObj.validateUser(authDtl).then(results => {
       res.json(JSON.parse(results));
    }).catch(err => {
        errtxt = {errMsg: "error in validateUser"}
        res.json(errtxt);
    })
})

module.exports = router