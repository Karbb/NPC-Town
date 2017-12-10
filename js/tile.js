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
        this.foregroundColor = null || World.display._options.fg;
        this.backgroundColor = null || World.display._options.bg;
    }

    Tile.prototype.isWalkable = function () {
        if (this instanceof EmptyTile && this.content.length > 0) {
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

    Tile.prototype.getZ = function () {
        return this.z;
    };

    Tile.prototype.getForeground = function () {
        return this.foregroundColor;
    };

    Tile.prototype.getBackground = function () {
        return this.backgroundColor;
    };

    function WallTile(x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "Wall";
        this.icon = "#";
    };

    WallTile.extend(Tile);

    function EmptyTile(x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "Empty";
        this.icon = ".";
        this.walkable = true;
    };

    EmptyTile.extend(Tile);

    function TreeTile(x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "Tree";
        this.icon = "O";
        this.walkable = false;
        this.foregroundColor = "#663300";
        this.backgroundColor = "#009900";
    };

    TreeTile.extend(Tile);

    root.Tile = Tile;
    root.WallTile = WallTile;
    root.EmptyTile = EmptyTile;
    root.TreeTile = TreeTile;
}(this));