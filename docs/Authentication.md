

### Authentication:

For the JWT Authentication I followed [this guide](https://ericswann.wordpress.com/2015/04/24/nozus-js-1-intro-to-sails-with-passport-and-jwt-json-web-token-auth/).

I used [bcryptjs](https://www.npmjs.com/package/bcryptjs) instead of [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs).

To set the JWT Secret, either modify the `passport.js` file in `config/passport.js` or set the `process.env.tokenSecret` variable when starting sails to the desidered token secret.
>tokenSecret=*token_secret* sails lift


#### JWT:

For more information about JWT look at

* [GitHub](https://github.com/docdis/learn-json-web-tokens)
* [toptotal.com](http://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs)
* [jwt.io](http://jwt.io/)
* [scotch.io](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
* [atlassian - understanding JWT](https://developer.atlassian.com/static/connect/docs/latest/concepts/understanding-jwt.html)
* [self-issued.info](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)


##### Signup:

Make a call to `http://localhost:1337/auth/signup` passing

```(json)
{
 "username":"testdude",
 "email":"test1@test.com",
 "password":"testdude"
}
```
to register a user. The user gets a `token`, the JWT Token, to be used in subsequent requests.

![image](https://cloud.githubusercontent.com/assets/8880943/7836450/96ac11a4-0480-11e5-8bef-69bfc004164c.png)


##### Signin:

Make a call to `http://localhost:1337/auth/signup` passing

```(json)
{
 "email":"test2@test.com",
 "password":"testdude2"
}
```

that is a `User` that already registered. Again you get the JWT Token, which must be used in subsequent requests.

![image](https://cloud.githubusercontent.com/assets/8880943/7838454/468b98ae-048d-11e5-90be-9a45b62b8049.png)

##### Additional Security:

You could add an additional layer of security by storing a record of issued tokens on the server, then verifying them against that record on each subsequent request. This would prevent a third-party from “spoofing” a token, and also allows the server to invalidate a token. I won’t cover that here, but it ought to be relatively straightforward to implement.
