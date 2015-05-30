/**
 * AclController
 *
 * @description :: Server-side logic for managing acls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

	allow: function(req, res) {
		var roles = safeLowerCase(req.param('roles'))
		var controller = safeLowerCase(req.param('controller'))
		var actions = safeLowerCase(req.param('actions'))

		var paramsError = utility.checkParams(req, 'roles', 'controller', 'actions')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

		acl.allow(roles, controller, actions, function(err) {
			if (err) {
				winston.error(err)
				return res.serverError(err)
			}
			else {
				return res.ok()
			}
		})
	},

	revoke: function(req, res) {
		var roles = safeLowerCase(req.param('roles'))
		var controller = safeLowerCase(req.param('controller'))
		var actions = safeLowerCase(req.param('actions'))

		var paramsError = utility.checkParams(req, 'roles', 'controller', 'actions')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

		acl.removeAllow(roles, controller, actions, function(err) {
			if (err) {
				winston.error(err)
				return res.serverError(err)
			}
			else {
				return res.ok()
			}
		})
	},

	addUserRoles: function(req, res) {
		var userId = req.param('id')
		var roles = safeLowerCase(req.param('roles'))

		var paramsError = utility.checkParams(req, 'id', 'roles')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

		acl.addUserRoles(userId, roles, function(err) {
			if (err) {
				winston.error(err)
				return res.serverError(err)
			}
			else {
				return res.ok()
			}
		})
	},

	getUserRoles: function(req, res) {
		var userId = req.param('id')

		var paramsError = utility.checkParams(req, 'id')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

    acl.userRoles(userId, function(err, roles) {
    	if(err) {
    		winston.error(err)
    		return res.serverError(err)
    	}
    	return res.json(roles)
    })
	},

	getAllRoles: function(req, res) {
    acl.userRoles('*', function(err, roles) {
    	if(err) {
    		winston.error(err)
    		return res.serverError(err)
    	}
    	return res.json(roles)
    })
	},

	removeUserRoles: function(req, res) {
		var userId = req.param('id')
		var roles = safeLowerCase(req.param('roles'))

		var paramsError = utility.checkParams(req, 'id', 'roles')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

		acl.removeUserRoles(userId, roles, function(err) {
			if (err) {
				winston.error(err)
				return res.serverError(err)
			}
			else return res.ok()
		})
	},

	removeRole: function(req, res) {
		var role = safeLowerCase(req.param('role'))

		var paramsError = utility.checkParams(req, 'role')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

		acl.removeRole(role, function(err) {
			if (err) {
				winston.error(err)
				return res.serverError(err)
			}
			else {
				return res.ok()
			}
		})
	},

	getControllers: function(req, res) {
		return res.json(utility.getAllControllers())
	},

	whatResources: function(req, res) {
		var roles = safeLowerCase(req.param('roles'))

		var paramsError = utility.checkParams(req, 'roles')

		if (paramsError) {
			return res.badRequest(paramsError)
		}

		acl.whatResources(roles, function(err, result) {
			if (err) {
				winston.error(err)
				return res.serverError(err)
			}
			else {
				return res.json(result)
			}
		})

	},

  // use this function to test ACL
  test: function(req, res) {
    return res.ok()
  }
}


// Convert a string or array of strings to lower case
var safeLowerCase = function(input) {
	if (_.isString(input)) {
		return input.toLowerCase()
	}
	if (_.isArray(input)) {
		return _.map(input, function(s) {
			return s.toLowerCase()
		})
	}
}
