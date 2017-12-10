(function (root) {
    "use strict";

    function Tile(x,y,z,type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.content = [];
    }

    Tile.prototype.isWalkable = function () {
        if (this.type === Tile.Empty && this.content.length > 0) {
            return false;
        }
        return this.type.walkable;
    };

    Tile.prototype.getIcon = function () {
        return (this.hasContent() ? this.getFirstItemInTile().getIcon() : this.type.icon);
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

    Tile.Wall = {
        id: 0,
        name: "wall",
        icon: "#",
        walkable: false
    };

    Tile.Empty = {
        id: 1,
        name: "empty",
        icon: ".",
        walkable: true
    };

    root.Tile = Tile;
}(this));