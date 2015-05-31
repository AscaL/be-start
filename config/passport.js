/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;


//TODO: Remove secret from here (?).
//TODO: Change how the secret is generated, for example with date
var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM';

// Use a different secret when running tests
if (process.env.NODE_ENV === 'test')
	SECRET = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//NOTE: This token is gonna be used for testing purposes.
var TESTTOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJjcmVhdGVkQXQiOiIyMDE1LTA1LTI4VDE2OjAzOjM2LjY1NVoiLCJ1cGRhdGVkQXQiOiIyMDE1LTA1LTI4VDE2OjAzOjM2LjY1NVoiLCJpZCI6M30sImlhdCI6MTQzMjgyOTAxNiwiYXVkIjoiZndyLml0IiwiaXNzIjoiZndyLml0In0.4Y2W_urcN_wIkuB8yxz0hfETSsY1_2VjSJThYg88Jmw'

var ALGORITHM = 'HS256';
var ISSUER = 'fwr.it';
var AUDIENCE = 'fwr.it';

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
	secretOrKey: SECRET,
	issuer: ISSUER,
	audience: AUDIENCE,
	passReqToCallback: false
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
	User.findOne({
			email: email
		})
		.exec(function (error, user) {
			if (error) return next(error, false, {});

			if (!user) return next(null, false, {
				code: 'E_USER_NOT_FOUND',
				message: email + ' is not found'
			});

			// TODO: replace with new cipher service type
			if (!cipherService.comparePassword(password, user))
				return next(null, false, {
					code: 'E_WRONG_PASSWORD',
					message: 'Password is wrong'
				});

			return next(null, user, {});
		});
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
	var user = payload.user;
	return next(null, user, {});
}

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
	expiresInMinutes: EXPIRES_IN_MINUTES,
	secret: SECRET,
	algorithm: ALGORITHM,
	issuer: ISSUER,
	audience: AUDIENCE,
	testToken: TESTTOKEN
};
