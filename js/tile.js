(function (root) {
    "use strict";

    function Tile(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.content = [];
    }

    Tile.prototype.getKey = function () {
        return this.x + "," + this.y;
    };

    Tile.prototype.isWalkable = function () {
        if (this.type === Tile.Empty && this.content.length > 0) {
            return false;
        }
        return this.type.walkable;
    };

    Tile.prototype.getIcon = function () {
        return this.type.icon;
    };

    Tile.prototype.getContent = function () {
        return this.content;
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

    root.NPCT.Tile = Tile;
}(this));