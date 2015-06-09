var util = require('util')

module.exports = {
  error: function (err) {
    console.log(util.inspect(err))
    console.log(util.inspect(err.stack))
  }
}
