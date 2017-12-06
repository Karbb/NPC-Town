(function (root) {
    "use strict";

    var Building = {
        Outside: {
            name: "Outside",
            description: "",
            owned: true,
            price: 0,
        }
    };

    Building.init = function (building) {
        var options = {
            width: 20,
            height: 12,
            fontSize: 16,
            forceSquareRatio: true,
        };

        NPCT.World.display = new ROT.Display(options);
        if (NPCT.World.containerDiv.hasChildNodes()) {
            NPCT.World.containerDiv.removeChild(NPCT.World.containerDiv.childNodes[0]);
        }
        NPCT.World.containerDiv.appendChild(NPCT.World.display.getContainer());

        NPCT.World.map = {};
        building.generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(NPCT.World.player, true);

        NPCT.World.engine = new ROT.Engine(scheduler);
        NPCT.World.engine.start();
    };

    Building.Outside.init = function () { 
        return Building.init(Building.Outside); 
    };

    Building.Outside.generateMap = function () {
        NPCT.World.map = new ROT.Map.CustomOutside(20, 12);

        var freeCells = [];

        var digCallback = function (x, y, value) {
            var key = x + "," + y;
            if (value) {
                NPCT.World.map[key] = "#";
            } else {
                NPCT.World.map[key] = ".";
                freeCells.push(key);
            }
        };

        NPCT.World.map.create(digCallback.bind(this));

        this.generateStuff(freeCells);
        this.drawWholeMap();
        this.createPlayer(freeCells);

    };

    Building.Outside.drawWholeMap = function () {
        for (var key in NPCT.World.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            NPCT.World.display.draw(x, y, NPCT.World.map[key]);
        }
    };

    Building.Outside.generateStuff = function (freeCells) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            NPCT.World.map[key] = "*";
        }
    };
    Building.Outside.createPlayer = function (freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        NPCT.World.player = new NPCT.Player(x, y);
    };

    ROT.Map.CustomOutside = function (width, height) {
        ROT.Map.call(this, width, height);
    };

    ROT.Map.CustomOutside.prototype.create = function (callback) {
        var w = this._width - 1;
        var h = this._height - 1;
        for (var i = 0; i <= w; i++) {
            for (var j = 0; j <= h; j++) {
                var empty = (i && j && i < w && j < h);
                if (j === Math.floor(h / 2) && i !== w || j === Math.floor(h / 2 + 1) && i !== w) {
                    empty = true;
                }
                callback(i, j, empty ? 0 : 1);
            }
        }
        return this;
    };

    root.NPCT.Building = Building;
}(this));