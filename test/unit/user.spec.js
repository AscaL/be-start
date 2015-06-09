var request = require('supertest')
var expect = require('chai').expect

describe('- UserModel', function () {
  describe('- create()', function () {
    it('- Should create a User with a post request and token', function (done) {
      request(sails.hooks.http.app)
        .post('/user/create')
        .set('Authorization', 'JWT ' + testToken)
        .send({
          username: 'user1',
          email: 'user1@test.com',
          password: 'user1'
        })
        .expect(201, done)
    })

    it('- Should fail to create a User without a token', function (done) {
      request(sails.hooks.http.app)
        .post('/user/create')
        .send({
          username: 'user2',
          email: 'user2@test.com',
          password: 'user2'
        })
        .expect(401, done)
    })

    it('- Should fail to create the same user twice', function (done) {
      request(sails.hooks.http.app)
        .post('/user/create')
        .set('Authorization', 'JWT ' + testToken)
        .send({
          username: 'user1',
          email: 'user1@test.com',
          password: 'user1'
        })
        .expect(400, done)
    })

    it('- Should create a User with User.create() function', function (done) {
      User.create({
        username: 'user2',
        email: 'user2@test.com',
        password: 'user2'
      }).then(function (res) {
        expect(res).to.have.property('username')
        expect(res.username).to.equal('user2')
        expect(res).to.have.property('password')
        expect(res).to.have.property('email')
        expect(res.email).to.equal('user2@test.com')
        done()
      }).catch(function (err) {
        console.log(err)
        done()
      })
    })

  })

  describe('- update()', function () {
    it('- Should update a User with User.update() function', function (done) {
      User.update({
        username: 'user2'
      }, {
        username: 'user3',
        email: 'user3@test.com',
        password: 'user3'
      }).then(function (res) {
        expect(res[0]).to.have.property('username')
        expect(res[0].username).to.equal('user3')
        expect(res[0]).to.have.property('password')
        expect(res[0]).to.have.property('email')
        expect(res[0].email).to.equal('user3@test.com')
        done()
      }).catch(function (err) {
        console.log(err)
        done()
      })
    })

  })

})
