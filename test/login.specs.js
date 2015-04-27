var nock = require('nock');

describe('Auth', function() {

    describe('Login Page', function() {

        before(function() {
            return this.browser.visit('/');
        });

        it('should show the login form', function() {
            this.browser.assert.element('#login_form')
            this.browser.assert.element('#login_form input[name="username"]')
            this.browser.assert.element('#login_form input[name="password"]')
        });

        it('should load up jquery, bluebird and login module', function() {
            this.browser.assert.evaluate('!!$', true);
            this.browser.assert.evaluate('!!Promise', true);
            this.browser.assert.evaluate('!!Login', true);
        });
    });

    describe('Login', function() {
        
        afterEach(function() {
            this.browser.assert.evaluate('delete window.auth');
        });

        describe('Loggin in successfully', function() {
            before(function() {
                this.authMock = nock('http://localhost', {allowUnmocked : true})
                .post('/openam/login', {
                    grant_type: 'password',
                    client_id: 'clientId',
                    username: '',
                    password: '' })
                    .reply(200, { access_token : 'xxxxx_yyyyyy_zzzzzz'});

                    return this.browser.pressButton('Login');
            });

            it('should set the access_token when login is successful', function() {
                this.browser.assert.evaluate('window.auth.access_token', 'xxxxx_yyyyyy_zzzzzz');
            });
        });


        describe('Loggin in - server returns 400', function() {
            before(function() {
                this.authMock = nock('http://localhost', {allowUnmocked : true})
                .post('/openam/login', {
                    grant_type: 'password',
                    client_id: 'clientId',
                    username: '',
                    password: '' })
                    .reply(400);
            });

            it('should set the access_token when login returns 400', function() {
                var me = this;
                return this.browser.pressButton('Login')
                .then(function() {},function() {
                    console.log('errr')
                }).then(function(){

                })
            });
        });


        describe('Loggin in - server returns 500', function() {
            before(function() {
                this.authMock = nock('http://localhost', {allowUnmocked : true})
                .post('/openam/login', {
                    grant_type: 'password',
                    client_id: 'clientId',
                    username: '',
                    password: '' })
                    .replyWithError('Something aweful happened');

this.browser.on('error',function() {
            console.log('xxxxx')
        })

                    return this.browser.pressButton('Login');
            });

            it('should set the access_token when login returns 500', function() {

                    console.log(this.browser.errors);
                this.browser.assert.evaluate('window.auth.access_token', 'xxxxx_yyyyyy_zzzzzz');
            });
        });

        describe('Loggin in - server returns 404', function() {
            before(function() {
                this.authMock = nock('http://localhost', {allowUnmocked : true})
                .post('/openam/login', {
                    grant_type: 'password',
                    client_id: 'clientId',
                    username: '',
                    password: '' })
                    .reply(404);

                    return this.browser.pressButton('Login');
            });

            it('should set the access_token when login returns 404', function() {
                this.browser.assert.evaluate('window.auth.access_token', 'xxxxx_yyyyyy_zzzzzz');
            });
        });
    });
});
