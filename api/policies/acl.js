/**
 * acl
 *
 * @module      :: Policy
 * @description :: Simple policy to check if ACL allows access to a given
 *                 resource and action
 *
 */

module.exports = function checkAcl (req, res, next) {
  var controller = req.options.controller
  var action = req.options.action
  var user = req.user || {}
  var userId = user.id || 0

  // Retrieve action and controller and check if user is allowed
  if(!_.isUndefined(userId) && !_.isUndefined(controller) && !_.isUndefined(action)) {
    acl.isAllowed(userId, controller, action, function (err, allowed) {
      if(allowed) {
        next()
      } else {
        return res.forbidden()
      }
    })
  }
  else return res.serverError()
}
