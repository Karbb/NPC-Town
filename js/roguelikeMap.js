(function (root) {
    "use strict";

    var RoguelikeMap = function (width, height) {
        this._width = width || ROT.DEFAULT_WIDTH;
        this._height = height || ROT.DEFAULT_HEIGHT;
        this.tiles = {};
        this.freeCells = [];
    };

    RoguelikeMap.prototype.getTiles = function () {
        return this.tiles;
    };

    RoguelikeMap.prototype.getTile = function (key) {
        return this.tiles[key];
    };

    RoguelikeMap.prototype.setTile = function (key, tile) {
        this.tiles[key] = tile;
    };

    RoguelikeMap.prototype.setFreeCells = function () {
        for (var key in this.tiles) {
            if (this.getTile(key).isWalkable()) {
                this.freeCells.push(key);
            }
        }
    };

    RoguelikeMap.prototype.getFreeCells = function () {
        return this.freeCells;
    };

    RoguelikeMap.WildlandMap = function (width, height) {
        RoguelikeMap.call(this, width, height);
    };

    RoguelikeMap.WildlandMap.prototype = RoguelikeMap.prototype;

    RoguelikeMap.WildlandMap.prototype.create = function (callback) {
        var w = this._width - 1;
        var h = this._height - 1;
        for (var i = 0; i <= w; i++) {
            for (var j = 0; j <= h; j++) {

                var empty = (i && j && i < w && j < h);
                var isWall = true;

                if ((j === Math.floor(h / 2) && i !== w) || (j === Math.floor(h / 2 + 1) && i !== w) || empty) {
                    isWall = false;
                }

                var tile = new Tile(i, j, 0, isWall ? Tile.Wall : Tile.Empty);

                callback(tile);
            }
        }
        return this;
    };

    root.RoguelikeMap = RoguelikeMap;
}(this));