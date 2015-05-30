var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {

  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,

  /**
   * Hash the password field of the passed user.
   * Salt is not autmatically generated. To salt it follow the comments.
   */
  hashPassword: function (user) {
    if (user.password) {
      //var salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password); //(user.password, salt)
    }
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function (password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  /**
   * Create a token based on the passed user.
   * The inclusion of the user in the payload is just an example.
   * In the real world, you might include the user id, claims etc.
   * @param user
   */
  createToken: function (user) {
    return jwt.sign({
        user: user.toJSON()
      },
      sails.config.jwtSettings.secret, {
        algorithm: sails.config.jwtSettings.algorithm,
        expiresInMinutes: sails.config.jwtSettings.expiresInMinutes,
        issuer: sails.config.jwtSettings.issuer,
        audience: sails.config.jwtSettings.audience
      }
    );
  }
};
