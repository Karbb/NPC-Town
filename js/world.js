"use strict";

var World = {
    init: function () {
        Notifications.init();
        this.syncUI();
        this.gIsGameOver = false;
    },
    start: function () {
        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
    },
    syncUI: function () {
       
    },
    gameloop: function () {
        this.syncUI();
        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
    },
    checkGameOver: function () {
    },
    onRestart: () => {
        World.init();
        World.start();
    },
    onStart: () => {
            World.init();
            World.start();
    }
};