(function (root) {
    "use strict";

    function Tile(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.content = [];
        this.icon = ".";
        this.walkable = false;
        this.harvestable = false;
        this.foreground = null || World.display._options.fg;
        this.background = null || World.display._options.bg;
    }

    Tile.prototype.isWalkable = function () {
        if (this instanceof Tile.EmptyTile && this.content.length > 0) {
            return false;
        }
        return this.walkable;
    };

    Tile.prototype.isHarvestable = function () {
        return this.harvestable;
    };

    Tile.prototype.getIcon = function () {
        return (this.hasContent() ? this.getFirstItemInTile().getIcon() : this.icon);
    };

    Tile.prototype.getForeground = function () {
        return (this.hasContent() ? this.getFirstItemInTile().getForeground() : this.foreground);
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

    Tile.prototype.getBackground = function () {
        return this.background;
    };

    Tile.prototype.setForeground = function (foreground) {
        this.foreground = foreground;
    };

    Tile.prototype.setBackground = function (background) {
        this.background = background;
    };

    Tile.WallTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.icon = "#";
        this.background = "#009900";
    };

    Tile.WallTile.extend(Tile);

    Tile.EmptyTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "nothing";
        this.icon = "";
        this.walkable = true;
        this.background = (["#663300", "#996600", "#cc9900", "#99cc00"].random());
    };

    Tile.EmptyTile.extend(Tile);

    Tile.HiddenTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "hidden";
        this.icon = "";
        this.walkable = false;
        this.background = '#000000';
    };

    Tile.HiddenTile.extend(Tile);

    Tile.TreeTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.icon = "O";
        this.name = "tree";
        this.walkable = false;
        this.foreground = "#663300";
        this.background = "#009900";
    };

    Tile.TreeTile.extend(Tile);

    Tile.LeafTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "foliage";
        this.icon = "";
        this.walkable = true;
        this.background = "#009900";
    };

    Tile.LeafTile.extend(Tile);

    Tile.BushTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.icon = "*";
        this.name = "bush";
        this.walkable = false;
        this.foreground = "#ff0000";
        this.background = (["#663300", "#996600", "#cc9900", "#99cc00"].random());
        this.content.push(new Item("Berry", [1, 2, 3, 5, 10].random()));
        this.harvestable = true;
    };

    Tile.BushTile.extend(Tile);

    Tile.ShopTile = function (x, y, z) {
        Tile.call(this, x, y, z);
        this.name = "nothing";
        this.icon = "";
        this.walkable = true;

        if (x + z % 2 === 0) {
            this.background = "#663300";
        } else {
            this.background = "#b35900";
        }
};

Tile.ShopTile.extend(Tile);

Tile.ShopWallTile = function (x, y, z) {
    Tile.call(this, x, y, z);
    this.icon = "#";
    this.background = "#331a00";
};

Tile.ShopWallTile.extend(Tile);

root.Tile = Tile;
}(this));