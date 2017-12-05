"use strict";

var World = {
    display: null,
    items: null,
    player: null,
    engine: null,
    map: null,
    buildingsDiv: document.getElementById("buildings"),
    container: document.getElementById("canvas"),


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
        this.listBuildings();
        Outside.init();
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
        for (var i = 0; i < Building.length; i++) {
            var building = Building[i];
            let string = document.createElement('p');
            string.innerHTML = building.name;
            string.className += "bordered";
            string.title = building.description;
            string.addEventListener("click", building.init);
            this.buildingsDiv.appendChild(string);
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
