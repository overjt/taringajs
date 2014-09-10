var S = require('string');

function shout(Taringa) {
    this.taringa = Taringa;
}
shout.prototype.add = function(msg, type, privacy, attachment) {
    var self = this;
    this.taringa.request.post('http://www.taringa.net/ajax/shout/add', {
        form: {
            key: self.taringa.user_key,
            attachment: attachment,
            attachment_type: type,
            privacy: privacy,
            body: msg
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var data = JSON.parse(body);
                if (data.status == 0) {
                    console.log(S(data.data).decodeHTMLEntities().stripTags().s);
                }
            } catch (e) {
                console.log("Shout realizado");
            }
        } else {
            console.log('Request was not succesful');
        }
    });
};
shout.prototype.like = function(id, owner_id) {
    var self = this;
    this.taringa.request.post('http://www.taringa.net/ajax/shout/vote', {
        form: {
            key: self.taringa.user_key,
            owner: owner_id,
            uuid: id,
            score: 1
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data.status == 0) {
                console.log(S(data.data).decodeHTMLEntities().stripTags().s);
            } else {
                console.log("Like realizado");
            }
        } else {
            console.log('Request was not succesful');
        }
    });
};
module.exports = shout;