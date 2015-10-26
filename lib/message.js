var Message;

Message = (function() {
  function Message(Taringa) {
    this.taringa = Taringa;
  }

  Message.prototype.get = function(id, callback) {
    var self;
    self = this;
    return this.taringa.request.get("http://www.taringa.net/mensajes/leer/" + id, function(err, resp, body) {
      var data;
      if (!err) {
        data = body.match(/<div class=\"clearfix\">\s+<h2 class=\"floatL\">(.*?)<\/h2>\s+<\/div>\s+<div id=\"print-mensaje\">\s+<div class=\"comment clearfix\">\s+<div class=\"comment-data\">\s+<a href=\".*?\" class=\"min-avatar\">\s+<img src=\".*?\" class=\"avatar-48\">\s+<\/a>\s+<\/div>\s+<div class=\"comment-text\">\s+<div class=\"comment-author clearfix\">\s+@<a class="hovercard" data-uid="\d+" href=".*?">(.*?)<\/a>\s+<span class="subtext">\s+<span ts="(\d+)" title=".*?".*?<\/span>\s+<\/span>\s+<div class="comment-content">([\s\S]+)<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+<div id=\"print-conversation\">/);
        if (data != null) {
          var mp = {
            "subject": data[1],
            "sender": data[2],
            "timestamp": data[3],
            "body": data[4].trim()
          }
          return callback.call(this, false, mp);
        } else {
          return callback.call(this, 'Messsage::get It is not a message');
        }
      } else {
        return callback.call(this, 'Messsage::get Request was not succesful');
      }
    });
  };

  Message.prototype.getLast = function(callback) {
    var self;
    self = this;
    return this.taringa.request.get("http://www.taringa.net/mensajes/recibidos/pagina1", function(err, resp, body) {
      var data;
      if (!err) {
        data = body.match(/<div class=\"m-opciones .*?\">\s+<input id=\"(\d+)\" name=\"\d+\" type=\"checkbox\" class/);
        if (data != null) {
          return callback.call(this, false, data[1]);
        } else {
          return callback.call(this, 'Messsage::getLas It is not a message');
        }
      } else {
        return callback.call(this, 'Messsage::getLast Request was not succesful');
      }
    });
  };

  return Message;

})();

module.exports = Message;