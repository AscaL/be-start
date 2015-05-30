var expect = require('chai').expect
// var request = require('supertest')

// all the tests will run as guest user
var userId = 0

describe('-Acl', function() {

  describe('-Assign a Role to a User', function(done) {

    it('-Should return 200', function(done) {
      request.post('/Acl/users/addUserRoles')
        .set('Authorization', 'JWT ' + testToken)
        .send({id: userId, roles: 'testrole'})
        .expect(200, done)
    })

    it('-Should return a 400 for malformed request', function(done) {
      request.post('/Acl/users/addUserRoles')
        .set('Authorization', 'JWT ' + testToken)
        .send({})
        .expect(400, done)
    })
  })

  describe('-Revoke a Role from a User', function(done) {

    it('-Should return 200', function(done) {
      request.delete('/Acl/users/removeUserRoles')
        .set('Authorization', 'JWT ' + testToken)
        .send({id: userId, roles: 'testrole'})
        .expect(200, done)
    })

    it('-Should return a 400 for malformed request', function(done) {
      request.delete('/Acl/users/removeUserRoles')
        .set('Authorization', 'JWT ' + testToken)
        .send({})
        .expect(400, done)
    })
  })

  describe('-Test role restrictions', function(done) {

    describe('-Allow access to resource', function(done) {

      before(function beforeAllowTest(done) {
        request.post('/Acl/users/addUserRoles')
          .set('Authorization', 'JWT ' + testToken)
          .send({id: userId, roles: 'testrole'})
          .expect(200, done)
      })

      it('-Should allow access to AclController.test', function(done) {
        request.post('/Acl/roles/allow')
          .set('Authorization', 'JWT ' + testToken)
          .send({roles: 'testrole', controller: 'acl', actions: 'test'})
          .expect(200, done)
      })

      it('-Should find testRole', function(done) {
        request.get('/Acl/users/getUserRoles/' + userId)
          .set('Authorization', 'JWT ' + testToken)
          .expect(200)
          .expect(['testrole'], done)
      })

      it('-Should try /Acl/test and get a 200 back', function(done) {
        request.get('/Acl/test')
          .expect(200, done)
      })

    })

    describe('-Revoke access to resource', function(done) {

      before(function beforeRevokeTest(done) {
        request.delete('/Acl/roles/revoke')
          .set('Authorization', 'JWT ' + testToken)
          .send({roles: 'testrole', controller: 'acl', actions: 'test'})
          .expect(200, done)
      })

      it('-Should try /Acl/test and get 403 back', function(done) {
        request.get('/Acl/test')
          .expect(403, done)
      })

      after(function afterRevokeTest(done) {
        request.post('/Acl/roles/allow')
          .set('Authorization', 'JWT ' + testToken)
          .send({roles: 'testrole', controller: 'acl', actions: 'test'})
          .expect(200, done)
      })

    })

    describe('-Remove role from user', function(done) {

      before(function beforeRemoveRole(done) {
        request.delete('/Acl/users/removeUserRoles')
          .set('Authorization', 'JWT ' + testToken)
          .send({id: userId, roles: 'testrole'})
          .expect(200, done)
      })

      it('-Should not find any assigned roles', function(done) {
        request.get('/Acl/users/getUserRoles/' + userId)
          .set('Authorization', 'JWT ' + testToken)
          .expect(200)
          .expect([], done)
      })

      it('-Should try /Acl/test and get 403 back', function(done) {
        request.get('/Acl/test')
          .expect(403, done)
      })

    })

    describe('-Destroy Role', function(done) {

      it('-Should destroy the role', function(done) {
        request.delete('/Acl/roles/remove')
          .set('Authorization', 'JWT ' + testToken)
          .send({role: 'testrole'})
          .expect(200, done)
      })
    })
  })
})
