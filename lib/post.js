var _ = require('lodash');

var Post = (function() {
    function Post(Taringa) {
        this.taringa = Taringa;
    }

	Post.prototype.addComment = function(comment, postId, postOwner){
		var self;
		self = this;
		return this.taringa.request.post('http://www.taringa.net/ajax/comments/add',{
			form: {
				key: self.taringa.user_key,
                comment: comment,
                objectId: postId,
                objectOwner: postOwner,
                objectType: 'post',
                show: 'true'
			}
		}, function(error, response, body) {
            var data;
            if (!error && response.statusCode === 200) {
                try {
                    data = JSON.parse(body);
                    if (data.status === 0) {
                        return self.taringa.log('Post::addComment -> ' + data.data);
                    }
                } catch (_error) {
                    error = _error;
                    return self.taringa.log('Post::addComment -> Post comentado');
                }
            } else {
                return self.taringa.log('Post::addComment -> Request was not succesful');
            }
    	});
	}
    

    return Post;

})();

module.exports = Post;