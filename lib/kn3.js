var Kn3, fs;

fs = require('fs');

Kn3 = (function() {
    function Kn3(Taringa) {
        this.taringa = Taringa;
    }

    Kn3.prototype.upload = function(file, callback) {
        var form, req, self;
        self = this;
        req = this.taringa.request.post('http://kn3.net/upload.php', function(error, response, body) {
            var data;
            if (!error && response.statusCode === 200) {
                data = JSON.parse(body);
                fs.unlink(file);
                return callback.call(this, false, data['direct']);
            } else {
                fs.unlink(file);
                return callback.call(this, 'Kn3::upload Request was not succesful');
            }
        });
        form = req.form();
        return form.append('files[]', fs.createReadStream(file));
    };

    Kn3.prototype["import"] = function(url, callback) {
        var self;
        self = this;
        return this.taringa.request.head(url, function(err, res, body) {
            if (!err) {
                console.log('content-length:', res.headers['content-length']);
                if (0 < res.headers['content-length'] && res.headers['content-length'] <= 2499334) {
                    return self.taringa.request(url).pipe(fs.createWriteStream("temporal.png")).on('close', function() {
                        return self.upload("temporal.png", callback);
                    });
                } else {
                    return callback.call(this, 'Kn3::import file too big');
                }
            } else {
                return callback.call(this, 'Kn3::import Request was not succesful');
            }
        });
    };

    return Kn3;

})();

module.exports = Kn3;