var nock = require('nock');
var Browser = require('zombie');

nock.enableNetConnect();

before(function () {
    Browser.localhost('localhost', 3000);

    this.browser = new Browser();
    this.authMock = nock('http://localhost', {allowUnmocked : true})
        .post('/openam/login', {
            grant_type: 'password',
            client_id: 'clientId',
            username: '',
            password: '' })
        .reply(200, { access_token : 'xxxxx_yyyyyy_zzzzzz'});

          var app = require('../index');
          return app;
});
