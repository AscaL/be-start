var acl = require('acl')
var redis = require('redis')
var backend
// Try to setup redis backend, if it is not possible setup a disk backend

// Is this the best way to fecth the redis settings?
var adapter = _.find(sails.config.connections, function (connection) {
  return /redis/.test(connection.adapter)
})

if (!_.isUndefined(adapter)) {
  // pull redis data from session config
  var redisPort = adapter.port || 6379
  var redisHost = adapter.host || '127.0.0.1'

  var client = redis.createClient(redisPort, redisHost, {no_ready_check: true})
  backend = new acl(new acl.redisBackend(client))
} else {
  sails.log.error('Please configure your redis adapter in config/connections.js')
  sails.log.info('ACL will look for an adapter with redis in its name')
  sails.log.info('You are not required to use the adapter in waterline but it must be present and configured')
  sails.log.info('Falling back to disk backend for ACL')
  backend = new acl(new acl.memoryBackend())
}

module.exports = backend
