var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

before(function () {
    var Browser = require('zombie');
    Browser.localhost('example.com', 3000);

    this.browser = new Browser();

    var app = require('../index');
    return app;
});
