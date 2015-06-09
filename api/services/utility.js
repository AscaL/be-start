// Utility function for getAllControllers
var pickActions = function (controller) {
  return _.pick(controller, function (maybeAction) {
    return !_.isUndefined(maybeAction._middlewareType)
  })
}

// Utility function for getAllControllers
var formatActions = function (controller) {
  return _.map(controller, function (action) {
    return action._middlewareType.substring(action._middlewareType.lastIndexOf('/') + 1)
  })
}

module.exports = {
  // ### getAllControllers
  // -----------------

  /**
  /* @return {Array} An array of controller names
  */

  // Reduce the contents of sails.controllers to a list of strings representing controller names.
  getAllControllers: function () {
    return _.mapValues(sails.controllers, _.compose(formatActions, pickActions))
  },

  // ### checkParams
  // -----------

  /**
  /* @param {Object} req - The sails request object
  /* @param {...String} parameter - Any number of parameter names to check
  /* @return {Error|false} Error or false if all parameters are present.
  **/

  // Utility function to check the request contains all the parameters we expect.
  checkParams: function () {
    // Turn arguments into a proper array
    var args = [].slice.call(arguments)

    // Request must be the first argument passed
    var req = args.shift()

    if (!args.length || !_.isObject(req) || !_.isFunction(req.param)) {
      throw new TypeError('First argument must be the sails request object')
    }

    for (var i = 0; i < args.length; i++) {
      if (_.isUndefined(req.param(args[i]))) {
        return new Error('Expected ' + args[i] + ' got undefined instead')
      }
    }(args[i])

    return false
  }
}
