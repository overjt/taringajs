var request = require('request'),
    S = require('string'),
    util = require('util'),
EventEmitter = require('events').EventEmitter;

function debug(msg) {
    debug(msg);
}

function Taringa(nick, password) {
    EventEmitter.call(this);
    this.username = '';
    this.password = '';
    this.user_id = '';
    this.user_key = '';
    this.request = request.defaults({
        headers: {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; rv:31.0) Gecko/20100101 Firefox/31.0'},
        jar: request.jar()
    });
    this.register('shout');
    this.login(nick, password);    
}

Taringa.prototype = Object.create(EventEmitter.prototype, {
    constructor: {
        value: Taringa
    }
});

Taringa.prototype.login = function(nick, password) {
    if (nick == '' || typeof nick === "undefined") {
        debug("Por favor ingrese un nick");
        return
    } else if (password == '' || typeof password === "undefined") {
        debug("Por favor ingrese el password");
        return
    }
    var self = this;
    this.request.post('http://www.taringa.net/registro/login-submit.php', {
        form: {
            nick: nick,
            pass: password,
            redirect: '/',
            connect: ''
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            if (data.status == 0) {
                debug(S(data.data).decodeHTMLEntities().stripTags().s);
            } else {
                self.username = nick;
                self.password = password;
                self.store_user_data();
            }
        } else {
            debug('Login failed: Request was not succesful');
        }
    });
};

Taringa.prototype.register = function(libName) {
    var lib = require('./lib/' + libName);    
    this[libName] = new lib(this);
};

Taringa.prototype.store_user_data = function() {
    var self = this;
    this.request('http://www.taringa.net/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var pattern = /var global_data = { user: \'(.*)\', user_key: \'(.*)\', postid/;
            var match = pattern.exec(body);
            if (match !== null && match.length == 3 && match[1] != '' && match[2] != '') {
                self.user_id = match[1];
                self.user_key = match[2];
                self.emit("logged");
            } else {
                debug("Error al extraer la key");
            }

        } else {
            debug('Request was not succesful');
        }
    });
};

module.exports = Taringa;
