var cheerio = require('cheerio')
var Promise = require('promise')

// Scraper

//function using cheerio to extract needed info

function getTags (htmlString, tag) {
  $ = cheerio.load(htmlString)
  var htmlObj = $(tag)

  // we could combine the keys.map and the reduce with lodash.reduce or similar
  var keys = Object.keys(htmlObj)
  var htmlTags = keys.map(function (key) {
    return htmlObj[key]
  })

  return htmlTags.reduce(function (memo, tagObj) {
    if (tagObj.name === tag) {
     memo.push(tagObj.attribs)
    }

    return memo
  }, [])
}

module.exports = {
  'getTags': getTags
}


//a function to read the webpage
function getPageData (url) {
  return new Promise(function(resolve, reject){
    fs.readFile (url, 'utf8', function(err, data) {
      if (err) {
        handleError(err)
      } else {
        resolve(data)
      // console.log(endResult)
    }
  })
  })
}
//a function to pull out the info we need

function getLinks(htmlData) {
  console.log(htmlData, typeof getTags)
  console.log(getTags)
  // return new Promise(function(resolve, reject){
  // if (err) {
  //   handleError(err)
  // } else {
    var possibleTitle = getTags(htmlData, 'h1')
    console.log(possibleTitle)
    // resolve(linkFile)
  // }
// })
}

//a function to write the info to the appropriate file
function writeLinks(links){
return new Promise(function(resolve, reject){
fs.writeFile(__dirname + '/data/data.json', links, 'utf8', function (err) {
    console.log('links written!')
    resolve(links)
})
})
}

//string them all together using .thens

getPageData ("http://clarkesworld.com")
.then(function (data){
  console.log("1", data)
  getLinks(data)
  .then(function (data){
    writeLinks(data)
    console.log("data", data)
  })
  .catch(handleError)

})

getPageData()