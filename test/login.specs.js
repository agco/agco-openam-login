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

    describe('Loggin in', function() {
        before(function() {
            return this.browser.pressButton('Login');
        });


        it('should show the login form', function() {
            this.browser.assert.evaluate('window.auth.access_token', 'xxxxx_yyyyyy_zzzzzz');
        });
    });
});

