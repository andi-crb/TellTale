var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')
var fs = require('fs')
var readFilePromise = require('./readFilePromise.js')
var writeFilePromise = require('./writeFilePromise.js')
var app = express()

app.use(cors( {
  origin: "http://localhost:9966"
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', function (req, res) {
  readFilePromise(path.join(__dirname, '../data/db.json'))
    .then(function (data) {
      res.send(data)
    .error(function (err) {
      console.log('ERROR: returning data from "/"', err)
    })
  })
})

// app.post('/', function (req, res){
//   console.log("req", req)
// })

app.post('/', function (req, res) {
  var keys = Object.keys(req.body)
  console.log(keys)
    writeFilePromise(path.join(__dirname, '../data/db.json'), keys[0])
      .then(function (data) {
        res.send('post request yeilded ', data)
      .error(function (err) {
      console.log('ERROR: posting data to "/"', err)
    })
  })
})



module.exports = app
