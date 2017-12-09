(function (root) {
    "use strict";

    var Zone = {
        Outside: {
            name: "Outside",
            description: "",
            owned: true,
            price: 0,
        }
    };

    Zone.init = function (zone) {
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
        zone.generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(NPCT.World.player, true);

        NPCT.World.engine = new ROT.Engine(scheduler);
        NPCT.World.engine.start();
    };

    /**
     * 
     */
    Zone.Outside.init = function () {
        return Zone.init(Zone.Outside);
    };

    Zone.Outside.generateMap = function () {
        NPCT.World.map = new ROT.Map.CustomOutside(20, 12);

        var freeCells = [];

        var digCallback = function (tile) {
            var key = tile.getKey();
            NPCT.World.map.tiles[key] = tile;

            if (tile.isWalkable()) {
                freeCells.push(key);
            }
        };

        NPCT.World.map.create(digCallback.bind(this));

        this.generateStuff(freeCells);
        this.drawWholeMap();
        this.createPlayer(freeCells);
    };

    Zone.Outside.drawWholeMap = function () {
        for (var tile in NPCT.World.map.tiles) {
            var key = tile;
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            NPCT.World.display.draw(x, y, NPCT.World.map.tiles[key].content.length > 0 ? NPCT.World.map.tiles[key].content[0].type.icon : NPCT.World.map.tiles[key].type.icon);
        }
    };

    Zone.Outside.generateStuff = function (freeCells) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            NPCT.World.map.tiles[key].content.push(new NPCT.Item(NPCT.Item.Berry, 1));
        }
    };

    Zone.Outside.createPlayer = function (freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        NPCT.World.player = new NPCT.Player(x, y);
    };

    ROT.Map.CustomOutside = function (width, height) {
        this._width = width || ROT.DEFAULT_WIDTH;
        this._height = height || ROT.DEFAULT_HEIGHT;
        this.tiles = {};
    };

    ROT.Map.CustomOutside.prototype.create = function (callback) {
        var w = this._width - 1;
        var h = this._height - 1;
        for (var i = 0; i <= w; i++) {
            for (var j = 0; j <= h; j++) {

                var empty = (i && j && i < w && j < h);
                var isWall = true;

                if ((j === Math.floor(h / 2) && i !== w) || (j === Math.floor(h / 2 + 1) && i !== w) || empty) {
                    isWall = false;
                }

                var tile = new NPCT.Tile(i, j, 0, isWall ? NPCT.Tile.Wall : NPCT.Tile.Empty);

                callback(tile);
            }
        }
        return this;
    };

    root.NPCT.Zone = Zone;
}(this));