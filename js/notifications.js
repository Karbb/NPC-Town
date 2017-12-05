'use strict';

var Notifications = {
    GAIN_CSS: "award",
    LOSS_CSS: "cost",
    MAX_NOTIFICATIONS_NUMBER: 10,
    init: function() {},
    parentDiv: document.getElementById("notifications"),
    create: function(message) {
        let string = document.createElement('p');
        string.innerHTML = message;

        this.parentDiv.appendChild(string);
        this.removeOldNotifications();
    },
    removeOldNotifications: function() {
        let notifications = this.parentDiv.children;
        if (notifications.length > this.MAX_NOTIFICATIONS_NUMBER) {
            notifications[0].remove();
        }
    }
};
