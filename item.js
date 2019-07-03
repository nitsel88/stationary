var express = require('express')
const dbObj = require("./database");
var router = express.Router()

// define the home page route
router.use('/', function (req, res) {
  res.json(JSON.parse(dbObj.getItems()));
})

// define the about route
//router.get('/about', function (req, res) {
 // res.send('About birds')
//})

module.exports = router