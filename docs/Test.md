### Test:

It's important **NOT TO** change `bootstrap.test.js`, specifically the lines about `testToken`.

![image](https://cloud.githubusercontent.com/assets/8880943/7864320/93bf873c-0561-11e5-921e-088cbcfbf93e.png)

`testToken` is the `JWT Token` that will be utilized in all the test to mock the standard autenthication. `testToken` is set to never expire and will be used only when testing.

If you need to modify `testToken` look in `config/passport.js`.
