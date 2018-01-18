(function (root) {
    "use strict";

    class RoguelikeMap {
        constructor(width, height) {
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
        }

        getTiles() {
            return this.tiles;
        }

        getTile(x, y) {
            return this.tiles[x][y];
        }

        setTile(x, y, tile) {
            this.tiles[x][y] = tile;
        }

        getFreeCells() {
            return this.freeCells;
        }
    }

    class WildlandMap extends RoguelikeMap {

        create(callback) {
            var w = this._width - 1;
            var h = this._height - 1;

            for (var x = 0; x <= w; x++) {
                for (var y = 0; y <= h; y++) {

                    var empty = (x && y && x < w && y < h);
                    var isWall = true;

                    if ((y === Math.floor(h / 2) && x !== w) || (y === Math.floor(h / 2 + 1) && x !== w) || empty) {
                        isWall = false;
                    }
                    var tile = isWall ? new Tile.WallTile(x, y, 0) : new Tile.EmptyTile(x, y, 0);
                    if (tile instanceof Tile.EmptyTile) {
                        this.freeCells.push(tile);
                    }
                    callback(tile);
                }
            }
            return this;
        }

    }

    class Shop extends RoguelikeMap {

        create(callback) {
            var w = this._width - 1;
            var h = this._height - 1;
            for (var x = 0; x <= w; x++) {
                for (var y = 0; y <= h; y++) {
                    var isWall = false;
                    var isHidden = false;

                    if (x < 10 || x > w - 10) {
                        isHidden = true;
                    } else{
                        if ((x === 10 || x === w - 10) || (y === 0 || y === h)){
                            isWall = true;
                        }
                    }

                    var tile;

                    if (isWall) {
                        tile = new Tile.ShopWallTile(x, y, 0);
                    } else if (isHidden) {
                        tile = new Tile.HiddenTile(x, y, 0);
                    } else {
                        tile = new Tile.ShopTile(x, y, 0);
                    }
                    if (tile instanceof Tile.ShopTile) {
                        this.freeCells.push(tile);
                    }
                    callback(tile);
                }
            }
            return this;
        };
    }

    root.RoguelikeMap = RoguelikeMap;
    root.WildlandMap = WildlandMap;
    root.Shop = Shop;
}(this));