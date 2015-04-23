var Login = function() {};

Login.prototype.init = function(options) {
    var me = this;
    $.support.cors = true;

    this.formId = '#' + options.formId;
    this.options = options;
    this.userNameField = $(this.formId + ' input[name="username"]');
    this.passwordField = $(this.formId + ' input[name="password"]');
    
    return new Promise(function(resolve, reject) {
        $(me.formId + ' form').submit(function() {
            event.preventDefault();
            me.submit()
            .then(resolve, reject);
        });
    });
};

Login.prototype.submit = function(event) {
    var me = this;
    return new Promise(function(resolve, reject) {
        var authData = {
            grant_type : 'password',
            client_id : me.options.clientId,
            username : me.userNameField.val(),
            password: me.passwordField.val()
        };

        $.post(me.options.url, authData )
        .done(function(data) {
            resolve(data);
        })
        .fail(reject);
    });
    
};

window.Login = window.Login || Login;
