var Notification = (function() {

    function Notification(Taringa) {
        this.taringa = Taringa;
    }

    Notification.prototype.getUnread = function (callback){

        this.taringa.request.post('https://www.taringa.net/notificaciones-ajax.php',{
            form:{  
                    key:this.taringa.user_key,
                    action:'last',
                    template:false,
                    imageSize:48
            }
        },function(err,res,body){
            if(err)
                return callback(err);

            var unreadNotifications = []
            var notifications = JSON.parse(body);

            notifications.forEach((notification)=>{
                if(notification.event.statusView !== 'read'){
                    unreadNotifications.push(notification);
                }
            });

            return callback(null,unreadNotifications);

        });
    }
    
    return Notification;

})();

module.exports = Notification;