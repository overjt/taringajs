var User;

User = (function() {
    function User(Taringa) {
        this.taringa = Taringa;
    }

    User.prototype.follow = function(user_id) {
        var self;
        self = this;
        return this.taringa.request.post('http://www.taringa.net/notificaciones-ajax.php', {
            form: {
                key: self.taringa.user_key,
                type: 'user',
                obj: user_id,
                action: 'follow'
            }
        }, function(error, response, body) {
            if (error || response.statusCode !== 200) {
                return self.taringa.log('User::follow -> Error al seguir al usuario');
            }
        });
    };

    User.prototype.unfollow = function(user_id) {
        var self;
        self = this;
        return this.taringa.request.post('http://www.taringa.net/notificaciones-ajax.php', {
            form: {
                key: self.taringa.user_key,
                type: 'user',
                obj: user_id,
                action: 'unfollow'
            }
        }, function(error, response, body) {
            if (error || response.statusCode !== 200) {
                return self.taringa.log('User::follow -> Error al dejar de seguir al usuario');
            }
        });
    };

    User.prototype.get_user_id_from_nick = function(nick, callback) {
        var self;
        self = this;
        return this.taringa.request('http://api.taringa.net/user/nick/view/' + nick, function(error, response, body) {
            var data;
            if (!error && response.statusCode === 200) {
                data = JSON.parse(body);
                return callback.call(this, false, data['id']);
            } else {
                return callback.call(this, 'User::get_user_id_from_nick Request was not succesful');
            }
        });
    };

    return User;

})();

module.exports = User;