var cheerio = require('cheerio')
var R = require('ramda')
var map = R.map



getTags: function getTags (htmlString, tag) {
  var $ = cheerio.load(htmlString)
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