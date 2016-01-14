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

    User.prototype.getFollowers = function(user_id,page,callback) {
        var page = page || '1';
        var userId = user_id || this.taringa.user_id;
        var self;
        self = this;
        return this.taringa.request('http://api.taringa.net/user/followers/view/'+userId+'?count=50&page='+page,
            function(error, response, body) {
            var data;
            if (error || response.statusCode !== 200) {
                return self.taringa.log('User::getFollowers -> Error al obtener followers del usuario');
            } else {
                data = JSON.parse(body);
                return callback.call(this, false, data);
            }
            
        });
    };

    User.prototype.getFollowings = function(user_id,page,callback) {
        var page = page || '1';
        var userId = user_id || this.taringa.user_id;
        var self;
        self = this;
        return this.taringa.request('http://api.taringa.net/user/followings/view/'+userId+'?count=50&page='+page,
            function(error, response, body) {
            var data;
            if (error || response.statusCode !== 200) {
                return self.taringa.log('User::getListFollowings -> Error al obtener followings del usuario');
            } else {
                data = JSON.parse(body);
                return callback.call(this, false, data);
            }
            
        });
    };

    User.prototype.getStats = function(user_id,callback) {
        var userId = user_id || this.taringa.user_id;
        return this.taringa.request('http://api.taringa.net/user/stats/view/'+userId,
            function(error, response, body) {
            var data;
            if (error || response.statusCode !== 200) {
                return self.taringa.log('User::getStats -> Error al obtener stats del usuario');
            } else {
                data = JSON.parse(body);
                return callback.call(this, false, data);
            }      
        });
    };
    
    
    return User;

})();

module.exports = User;