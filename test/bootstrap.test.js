var Sails = require('sails')
var agent = require('supertest')
// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      /* If you need to see what errors are given change this to 'error' */
      level: 'silent'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, function (err) {
    if (err)
      return done(err)

    /* Import the testToken from config/passport.js and it keeps it global. */
    /* DO NOT TOUCH */
    testToken = sails.config.jwtSettings.testToken
    request = agent(sails.hooks.http.app)
    // Anything else you need to set up

    done()
  })
})

// Global after hook
after(function (done) {
  console.log() // Skip a line before displaying Sails lowering logs
  Sails.lower(done)
})
