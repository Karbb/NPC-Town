"use strict";

var World = {
    player: null,
    init: function () {
        Notifications.init();
        this.player = new Player([]);
        this.syncUI();
        this.gIsGameOver = false;
    },
    start: function () {
        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
    },
    syncUI: function () {
        this.player.draw();
        this.listBuildings();
    },
    gameloop: function () {
        this.syncUI();
        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
    },
    checkGameOver: function () {},
    onRestart: () => {
        World.init();
        World.start();
    },
    onStart: () => {
        World.init();
        World.start();
    },
    listBuildings: function () {
        for (var i in Building) {
            var building = Building[i];
            if (!building.owned) {
                
            }
        }
    }
};
