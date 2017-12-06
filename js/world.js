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
        buildingsDiv: document.getElementById("buildings"),
        containerDiv: document.getElementById("canvas"),
        inventoryDiv: document.getElementById("inventory"),
    };

    /**
     * Init a new world
     */
    World.init = function () {
        NPCT.Notifications.clear();
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
        this.listBuildings();
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
    World.listBuildings = function () {
        for (var i in NPCT.Building) {
            var building = NPCT.Building[i];
            if (building.name === "") {
                break;
            }
            let string = document.createElement('p');
            string.innerHTML = building.name;
            string.className += "bordered";
            string.title = building.description;
            string.addEventListener("click", building.init);
            this.buildingsDiv.appendChild(string);
        }
    };
    /**
     * 
     */
    World.drawinventory = function () {
            this.inventoryDiv.innerHTML = "";
        this.inventory.forEach(item => {
            let string = document.createElement('p');
            string.innerHTML = item.name + ": " + item.quantity;
            string.title = item.description;
            this.inventoryDiv.appendChild(string);
        });
    };

    root.NPCT.World = World;
}(this));
