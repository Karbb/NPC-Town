(function (root) {

    'use strict';

    var Notifications = {
        MAX_NOTIFICATIONS_NUMBER: 10,
        notificationsDiv: document.getElementById("notifications")
    };

    /**
     * Function that remove all existing notifications
     */
    Notifications.clear = function () {
        this.notificationsDiv.innerHTML = "";
    };

    Notifications.create = function (message) {
        var string = document.createElement('p');
        string.innerHTML = message;

        this.notificationsDiv.insertBefore(string, this.notificationsDiv.firstChild);
        Notifications.removeOldNotifications();
    };
    Notifications.removeOldNotifications = function () {
        let notifications = this.notificationsDiv.children;
        if (notifications.length > this.MAX_NOTIFICATIONS_NUMBER) {
            notifications[this.MAX_NOTIFICATIONS_NUMBER - 1].remove();
        }
    };

    root.Notifications = Notifications;
}(this));
