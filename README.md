#AGCO OpenAM Login Module

## Dependencies
This module depends on [jquery](https://github.com/jquery/jquery) and [bluebird](https://github.com/petkaantonov/bluebird)

## Installation
To install as a Bower component:

```
bower install agco-openam-login --save
```

Or just download the repo and place the ```login.js``` with your scripts.

Then just include the script in your page

```html
<script src="components/login/dist/login.js"></script>
```

## Usage
Place the login form in your page, notice that the field names for username and password should be as is.

```html
<section id="login_form">
    <h1>Login</h1>
    <form method="post">
        <p><input type="text" name="username" value="" placeholder="Username"></p>
        <p><input type="password" name="password" value="" placeholder="Password"></p>
        <p class="submit"><input type="submit" name="commit" value="Login"></p>
    </form>
</section>
```

Then initiate the module:

```javascript
var login = new Login();
var promise = login.init({
    formId : 'login_form',
    url : 'url',
    clientId : 'clientId',
    clientSecret : 'clientSecret'
});

promise.then(function(auth) {
    console.log(auth);
});
```

At this state, ```login.init()``` returns a promise which resolves when the login is successful.
