(function (root) {
    "use strict";

    var Zone = {
        Wildland: {
            name: "Wildland",
            description: "",
            owned: true,
            price: 0,
        }
    };

    Zone.init = function (zone) {
        Screen.drawScreen(World.display);

        World.map = {};
        zone.generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(World.player, true);

        World.engine = new ROT.Engine(scheduler);

        Notifications.clear();
        Notifications.create("Press '\\' to display game help.");

        World.engine.start();
    };

    /**
     * 
     */
    Zone.Wildland.init = function () {
        return Zone.init(Zone.Wildland);
    };

    Zone.Wildland.generateMap = function () {
        World.map = new RoguelikeMap.WildlandMap(200, 50);

        var digCallback = function (tile) {
            World.map.setTile(tile.getX(), tile.getY(), tile);
        };

        World.map.create(digCallback.bind(this));
        this.generateStuff(World.map.getFreeCells());
        this.createPlayer(World.map.getFreeCells());

        World.display.clear();
        World.render();
    };

    Zone.Wildland.drawWholeMap = function () {
        for (var x = 0; x < 50; x++) {
            for (var y = 0; y < 30; y++) {
                World.display.draw(x, y, World.map.getTile(x, y).getIcon());
            }
        }
    };

    Zone.Wildland.generateStuff = function (freeCells) {
        var generateBushes = function () {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            let randomTile = freeCells[index];
            World.map.setTile(randomTile.getX(), randomTile.getY(), new Tile.BushTile(randomTile.getX(), randomTile.getY(), 0));
            freeCells.splice(index, 1);
        };

        var generateTrees = function () {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            let randomTile = freeCells[index];
            World.map.setTile(randomTile.getX(), randomTile.getY(), new Tile.TreeTile(randomTile.getX(), randomTile.getY(), 0));

            for (let x = randomTile.getX() - 1; x < randomTile.getX() + 2; x++) {
                for (let y = randomTile.getY() - 1; y < randomTile.getY() + 2; y++) {
                    World.map.getTile(x, y).setBackground("#009900");
                }
            }
            freeCells.splice(index, 1);
        };

        for (let i = 0; i < 50; i++) {
            generateTrees();
            generateBushes();
        }
    };

    Zone.Wildland.createPlayer = function (freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        let randomTile = freeCells[index];
        World.player = new Player(randomTile.getX(), randomTile.getY());
        freeCells.splice(index, 1);
    };

    root.Zone = Zone;
}(this));