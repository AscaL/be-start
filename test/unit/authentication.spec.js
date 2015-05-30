var expect = require('chai').expect;

var authTestToken;

describe('- AuthController', function () {

	describe('- singup()', function () {

		it('- Should sign up a User', function (done) {
			request
				.post('/Auth/signup')
				.send({
					username: 'test',
					email: 'test@test.com',
					password: 'test'
				})
				.expect(201)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.data).to.have.property('token');
					authTestToken = res.body.data.token;
					expect(res.body.data).to.not.have.property('password');
					expect(res.body.data).to.have.property('user');
					expect(res.body.data.user.username).to.equal('test');
					expect(res.body.data.user.email).to.equal('test@test.com');
					done();
				})
		});

		it('- Should not sign up a User without password', function (done) {
			request
				.post('/Auth/signup')
				.send({
					username: 'test1',
					email: 'test1@test.com',
				})
				.expect(500, done);
		});

	});

	describe('- signin()', function () {

		it('- Should sign in a User after registration', function (done) {
			request
				.post('/Auth/signin')
				.send({
					email: 'test@test.com',
					password: 'test'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.token).to.exist;
					expect(res.body.user).to.not.have.property('password');
					expect(res.body.user).to.have.property('username');
					expect(res.body.user).to.have.property('email');
					expect(res.body.user.username).to.equal('test');
					expect(res.body.user.email).to.equal('test@test.com');
					done();
				});
		});

		it('- Should not sign in an unregistered user', function (done) {
			request
				.post('/Auth/signin')
				.send({
					email: 'testfail@test.com',
					password: 'testfail'
				})
				.expect(401, done);
		});

		it('- Should not sign in a User providing the wrong passowrd', function (done) {
			request
				.post('/Auth/signin')
				.send({
					email: 'test@test.com',
					password: 'notfound'
				})
				.expect(401, done);
		});

		it('- Should not sign in a User providing the wrong email', function (done) {
			request
				.post('/Auth/signin')
				.send({
					email: 'testfail@test.com',
					password: 'test'
				})
				.expect(401, done);
		});

	});

	describe('- Use the token', function () {

		it('- Should send a sucessful request to User using the token from registration', function (done) {
			request
				.get('/User')
				.set('Authorization', 'JWT ' + authTestToken)
				.expect(200, done)
		});

		it('- Should fail to send a sucessful request to User without using the token from registration', function (done) {
			request
				.get('/User')
				.expect(401, done)
		});

	});

});
