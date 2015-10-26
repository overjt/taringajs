var t = require('taringajs');
var taringa = new t('USERNAME', 'PASSWORD');
taringa.on('logged', function() {
    console.log(taringa.realtime_data);
    taringa.shout.add("Test - #NodeJS");
    taringa.shout.add("Test image", 1, 0, "http://k33.kn3.net/taringa/9/2/3/6/7/8//djtito08/9B4.jpg");
    taringa.shout.add("Test video", 2, 0, "https://www.youtube.com/watch?v=l7Fi8-7HRhc");
    taringa.shout.add_comment("Hola", 60544255, 19963011, "shout")
    taringa.shout.like(60544255, 19963011)
    taringa.shout.get_object(60544255, function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });

    taringa.kn3.import("https://i.imgur.com/s8yBeZ8.png", function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });

    taringa.user.get_user_id_from_nick("overjt", function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });

    taringa.user.follow(19963011);

    taringa.user.unfollow(6046);

    taringa.message.getLast(function(err, id) {
        if (err) {
            return console.log(err);
        }
        console.log(id);
        taringa.message.get(id, function(err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        });
    });
});