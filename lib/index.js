var $ = require('jquery')
var utils = require('./ajax.js')
var dateFormat = require('dateformat');
var cheerio = require('cheerio')
var Promise = require('promise')
var request = require('superagent')
// var cheerio = require('cheerio')
// var R = require('ramda')
// var map = R.map


//Define functions from Ajax file

var storiesFromServer = utils.storiesFromServer
var addStory = utils.addStory



//An error handling function

function handleError (err) {
  console.log('Oh no! A error :', err)
}

//These functions get the stories from the server and add them to the page.

function appendStories(storiesFromServer) {
  storiesFromServer(appendCallback)
}

function appendCallback (err, res) {
  var parsedData = JSON.parse(res.text)
  var stories = parsedData.story
  stories.forEach(function (story) {
    $('#stories').prepend('<article><h2>' + story.title + '</h2><p>' + story.author + '</p><p>' + story.datestamp + '</p><p>' + story.url + '</p></article>')
  })
}
appendStories(storiesFromServer)

//Datestamp


var now = new Date();
dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");


//These functions send inputted info to the server

// document.getElementById("save").addEventListener("click", formatObjectToSend);

function formatObjectToSend(){
  var title = $('#title').val()
  var url = $('#url').val()
  var author = $('#author').val()
  var datestamp = dateFormat();
  var object =  {"title": title, "author": author, "url": url, "datestamp": datestamp}
  // console.log(object)
  addPostToDatabase(object)
}

function addPostToDatabase (newPost) {
  storiesFromServer(function(err, res) {
    // if (err) { console.log('ERROR: reading while trying to write post'); return }
    var parsedData = JSON.parse(res.text)
    console.log(parsedData)
    parsedData.story.push(newPost)
    var objectToPost = JSON.stringify(parsedData)
    addStory(objectToPost)
  })
}

