(function (root) {
    "use strict";

    function Tile(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.content = [];
        this.name = name || "null";
        this.icon = ".";
        this.walkable = false;
    }

    Tile.prototype.isWalkable = function () {
        if (this instanceof Tile.EmptyTile && this.content.length > 0) {
            return false;
        }
        return this.walkable;
    };

    Tile.prototype.getIcon = function () {
        return (this.hasContent() ? this.getFirstItemInTile().getIcon() : this.icon);
    };

    Tile.prototype.getContent = function () {
        return this.content;
    };

    Tile.prototype.addItem = function (item) {
        return this.content.push(item);
    };

    Tile.prototype.getFirstItemInTile = function () {
        return this.content[this.content.length - 1];
    };

    Tile.prototype.hasContent = function () {
        if (this.content.length > 0) {
            return true;
        } else {
            return false;
        }
    };

    Tile.prototype.getX = function () {
        return this.x;
    };

    Tile.prototype.getY = function () {
        return this.y;
    };

    Tile.prototype.getZ = function (item) {
        return this.z;
    };

    Tile.WallTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "Wall";
        this.icon = "#";
    };

    Tile.WallTile.prototype = Tile.prototype;

    Tile.EmptyTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "Empty";
        this.icon = ".";
        this.walkable = true;
    };

    Tile.EmptyTile.prototype = Tile.prototype;

    root.Tile = Tile;
}(this));