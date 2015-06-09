/**
 * User
 * @description :: Model for storing users
 */
module.exports = {
  schema: true,

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      defaultsTo: ''
    },

    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    toJSON: function () {
      var user = this.toObject()
      return _.omit(user, 'password')
    }
  },

  beforeUpdate: function (values, next) {
    cipherService.hashPassword(values)
    next()
  },

  beforeCreate: function (values, next) {
    cipherService.hashPassword(values)
    next()
  }

}
