(function (root) {
    "use strict";

    var RoguelikeMap = function (width, height) {
        this._width = width || ROT.DEFAULT_WIDTH;
        this._height = height || ROT.DEFAULT_HEIGHT;
        this.tiles = [];

        for (var x = 0; x < this._width; x++) {
            this.tiles.push([]);
            for (var y = 0; y < this._height; y++) {
                this.tiles[x].push(undefined);
            }
        }

        this.freeCells = [];
    };

    RoguelikeMap.prototype.getTiles = function () {
        return this.tiles;
    };

    RoguelikeMap.prototype.getTile = function (x, y) {
        return this.tiles[x][y];
    };

    RoguelikeMap.prototype.setTile = function (x, y, tile) {
        this.tiles[x][y] = tile;
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
        for (var x = 0; x <= w; x++) {
            for (var y = 0; y <= h; y++) {

                var empty = (x && y && x < w && y < h);
                var isWall = true;

                if ((y === Math.floor(h / 2) && x !== w) || (y === Math.floor(h / 2 + 1) && x !== w) || empty) {
                    isWall = false;
                }
                var tile = isWall ? new WallTile(x, y, 0) : new EmptyTile(x, y, 0);
                if(tile instanceof EmptyTile){
                    console.log(tile);
                    this.freeCells.push(tile);
                }
                callback(tile);
            }
        }
        return this;
    };

    root.RoguelikeMap = RoguelikeMap;
}(this));