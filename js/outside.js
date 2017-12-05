"use strict";

var Outside = {
    container: document.getElementById("map"),
    init: function () {
        var options = {
            width: 20,
            height: 12,
            fontSize: 16,
            forceSquareRatio: true,
        }

        World.display = new ROT.Display(options);
        if (this.container.hasChildNodes()) {
            this.container.removeChild(this.container.childNodes[0]);
        }
        this.container.appendChild(World.display.getContainer());

        World.map = {};
        this.generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(World.player, true);

        World.engine = new ROT.Engine(scheduler);
        World.engine.start();
    },
    generateMap: function () {
        World.map = new ROT.Map.CustomOutside(20, 12);

        var freeCells = [];

        var digCallback = function (x, y, value) {
            var key = x + "," + y;
            if (value) {
                World.map[key] = "#";
            } else {
                World.map[key] = ".";
                freeCells.push(key);
            }
        }

        World.map.create(digCallback.bind(this));

        this.generateStuff(freeCells);
        this.drawWholeMap();
        this.createPlayer(freeCells);

    },
    drawWholeMap: function () {
        for (var key in World.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            World.display.draw(x, y, World.map[key]);
        }
    },
    generateStuff: function (freeCells) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            World.map[key] = "*";
        }
    },
    createPlayer: function (freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        World.player = new Player(x, y);
    }
};

ROT.Map.CustomOutside = function (width, height) {
    ROT.Map.call(this, width, height);
};

ROT.Map.CustomOutside.extend(ROT.Map);

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