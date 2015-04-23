

describe('Login Page', function() {

    before(function(done) {
        this.browser.visit('/', done);
    })

    it('should show the login form', function() {
        this.browser.assert.element('#login_form')
        this.browser.assert.element('#login_form input[name="username"]')
        this.browser.assert.element('#login_form input[name="password"]')
    });
});

