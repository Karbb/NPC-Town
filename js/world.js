(function (root) {
    "use strict";

    var World = {
        /** 
         * Rot.Display instance */
        display: null,
        /**
         * Array field storing items
         */
        inventory: null,
        /**
         * Rot.Engine instance
         */
        engine: null,
        /**
        * Rot.Map instance
        */
        map: null,
        player: null,

        /**
         * Div HTMLObjects list
         */
        zonesDiv: document.getElementById("zones"),
        containerDiv: document.getElementById("canvas"),
        inventoryDiv: document.getElementById("inventory"),
        contentDiv: document.getElementById("contentTitle"),
    };

    /**
     * Init a new world
     */
    World.init = function () {
        Notifications.clear();
        this.syncUI();
        this.gIsGameOver = false;
        this.inventory = [];
    };

    /**
     * Start a new world
     */
    World.start = function () {
        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
        this.listZones();
    };

    /**
     * Draw UI
     */
    World.syncUI = function () {

    };

    /**
     * Gameloop function
     * - syncUI
     * - checkGameOver
     */
    World.gameloop = function () {
        this.syncUI();
        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
    };

    /**
     * 
     */
    World.checkGameOver = function () {

    };

    World.onRestart = function () {
        World.init();
        World.start();
    };

    World.onStart = function () {
        World.init();
        World.start();
    };

    /**
     * 
     */
    World.listZones = function () {
        for (var i in Zone) {
            var zone = Zone[i];
            if (zone.name === "") {
                break;
            }
            let string = document.createElement('p');
            string.innerHTML = zone.name;
            string.className += "bordered";
            string.title = zone.description;
            string.addEventListener("click", zone.init);
            this.zonesDiv.appendChild(string);
        }
    };

    /**
     * 
     */
    World.drawinventory = function () {
        this.inventoryDiv.innerHTML = "";
        this.inventory.forEach(item => {
            let string = document.createElement('p');
            string.innerHTML = item.type.name + ": " + item.quantity;
            string.title = item.type.description;
            this.inventoryDiv.appendChild(string);
        });
    };

    World.render = function () {
        var screenWidth = World.display._options.width;
        var screenHeight = World.display._options.height;

        var topLeftX = Math.max(0, World.player._x - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, World.map._width - screenWidth);
        topLeftX = Math.floor(topLeftX);

        var topLeftY = Math.max(0, World.player._y - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, World.map._height - screenHeight);
        topLeftY = Math.floor(topLeftY);

        for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                World.display.draw(x - topLeftX, y - topLeftY, World.map.getTile(x, y).getIcon(), World.map.getTile(x, y).getForeground(), World.map.getTile(x, y).getBackground());
            }
        }
        World.display.draw(World.player._x - topLeftX, World.player._y - topLeftY, "@", "#ffff00", World.map.getTile(World.player._x, World.player._y).getBackground());
    };

    root.World = World;
}(this));
