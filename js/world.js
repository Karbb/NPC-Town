"use strict";

var World = {
    display: null,
    items: null,
    player: null,
    engine: null,
    map: null,
    init: function () {
        Notifications.init();
        this.syncUI();
        this.gIsGameOver = false;
        this.items = [];
    },
    start: function () {
        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
        Outside.init();
    },
    syncUI: function () {
        this.listBuildings();
    },
    gameloop: function () {
        this.syncUI();
        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
    },
    checkGameOver: function () { },
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
    },
    inventory: function () {
        var parentDiv = document.getElementById("inventory");
        parentDiv.innerHTML = '';

        this.items.forEach(item => {
            let string = document.createElement('p');
            string.innerHTML = item.name + ": " + item.quantity;
            string.title = item.description;
            parentDiv.appendChild(string);
        });
    }
};
