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
        var options = {
            width: 20,
            height: 12,
            fontSize: 24,
            forceSquareRatio: true,
            fontFamily : "monospace",
            spacing : 1.05
        };

        World.display = new ROT.Display(options);
        if (World.containerDiv.hasChildNodes()) {
            World.containerDiv.removeChild(World.containerDiv.childNodes[0]);
        }

        World.contentDiv.innerText = zone.name;
        World.containerDiv.appendChild(World.display.getContainer());

        World.map = {};
        zone.generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(World.player, true);

        World.engine = new ROT.Engine(scheduler);
        World.engine.start();
    };

    /**
     * 
     */
    Zone.Wildland.init = function () {
        return Zone.init(Zone.Wildland);
    };

    Zone.Wildland.generateMap = function () {
        World.map = new RoguelikeMap.WildlandMap(20, 12);

        var digCallback = function (tile) {
            var key = tile.getKey();
            World.map.setTile(key, tile);

            World.map.setFreeCells();
        };

        World.map.create(digCallback.bind(this));

        this.generateStuff(World.map.getFreeCells());
        this.drawWholeMap();
        this.createPlayer(World.map.getFreeCells());
    };

    Zone.Wildland.drawWholeMap = function () {
        for (var key in World.map.tiles) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            World.display.draw(x, y, World.map.getTile(key).hasContent() ? World.map.getTile(key).getFirstItemInTile().getIcon() : World.map.getTile(key).getIcon());
        }
    };

    Zone.Wildland.generateStuff = function (freeCells) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            World.map.getTile(key).addItem(new Item("Berry", 1));
        }
    };

    Zone.Wildland.createPlayer = function (freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        World.player = new Player(x, y);
    };

    root.Zone = Zone;
}(this));