var request = require('superagent')
var path = require('path')


storiesFromServer: function storiesFromServer (callBack) {
  request
  .get('http://localhost:3000/')
  .end(callBack)
}

addStory: function addStory (object){
  request
  .post('http://localhost:3000/')
  .send(object)
  .end()
}

module.exports = {
  'storiesFromServer': storiesFromServer,
  'addStory': addStory
}
