describe('- Response Testing', function () {

	it('- Should fail to send a request to Products giving 404 Not Found', function (done) {
		request
			.get('/Products')
			.set('Authorization', 'JWT ' + testToken)
			.expect(404, done)
	});
});
