var EventEmitter, Taringa, request,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

request = require('request');

EventEmitter = require('events').EventEmitter;

Taringa = (function(superClass) {
  extend(Taringa, superClass);

  function Taringa(username, password) {
    if ((username != null) && (password != null)) {
      this.username = username;
      this.password = password;
      this.user_id = '';
      this.user_key = '';
      this.realtime_data = null;
      this.request = request.defaults({
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:31.0) Gecko/20100101 Firefox/31.0'
        },
        jar: request.jar()
      });
      this.register('shout');
      this.register('user');
      this.register('kn3');
      this.register('message');
      
      this.login();
    } else {
      throw new Error("Not enough parameters provided. I need a username, a password");
    }
  }

  Taringa.prototype.log = function(msg) {
    return console.log(msg);
  };

  Taringa.prototype.login = function() {
    var fields, self;
    self = this;
    fields = {
      form: {
        nick: this.username,
        pass: this.password,
        redirect: '/',
        connect: ''
      }
    };
    return this.request.post('http://www.taringa.net/registro/login-submit.php', fields, function(error, response, body) {
      var data;
      if (!error && response.statusCode === 200) {
        data = JSON.parse(body);
        if (data.status === 0) {
          throw new Error("Login failed: Request was not succesful");
        } else {
          return self.store_user_data();
        }
      } else {
        throw new Error("Login failed: Request was not succesful");
      }
    });
  };

  Taringa.prototype.register = function(libName) {
    var lib;
    lib = require('./lib/' + libName);
    return this[libName] = new lib(this);
  };

  Taringa.prototype.store_user_data = function() {
    var self;
    self = this;
    return this.request('http://www.taringa.net/', function(error, response, body) {
      var match, pattern;
      if (!error && response.statusCode === 200) {
        pattern = /var global_data = { user: \'(.*)\', user_key: \'(.*)\', postid/;
        match = pattern.exec(body);
        if ((match != null) && match.length === 3 && match[1] !== '' && match[2] !== '') {
          self.user_id = match[1];
          self.user_key = match[2];
          pattern = /new Realtime\({\"host\":\"(.*?)\",\"port\":(\d+),\"useSSL\":true}(?:[^]+) notifications\('([a-z0-9]+)',/i;
          match = pattern.exec(body);
          if ((match != null) && match.length === 4) {
            self.realtime_data = {
              "ip": match[1],
              "port": match[2],
              "hash": match[3]
            }
            return self.emit('logged');
          } else {
            throw new Error("Login failed: Request was not succesful- Realtime");
          }
        } else {
          throw new Error("Login failed: Request was not succesful- UserKey");
        }
      } else {
        throw new Error("Login failed: Request was not succesful");
      }
    });
  };

  return Taringa;

})(EventEmitter);

module.exports = Taringa;