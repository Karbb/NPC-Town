(function (root) {
    "use strict";

    var Player = function (x, y) {
        this._x = x;
        this._y = y;
    };

    Player.itemAcquired = function (itemToAdd) {
        var itemExisting = null;
        var inventory = World.inventory;

        for (var i = 0; i < inventory.length; i++) {
            var item = inventory[i];
            if (item.type === itemToAdd.type) {
                itemExisting = item;
                break;
            }
        }

        if (itemExisting === null) {
            inventory.push(itemToAdd);
            Notifications.create("Added" + itemToAdd.getQuantity() + " " + itemToAdd.getName());
        } else {
            itemExisting.modifyQuantity(itemToAdd.quantity);
            Notifications.create("Added" + itemToAdd.getQuantity() + " " + itemToAdd.getName());
        }

        World.drawinventory();
    };

    Player.itemUsed = function (itemToUse) {
        var inventory = World.inventory;

        for (var i = 0; i < inventory.length; i++) {
            var item = inventory[i];
            if (item.type === itemToUse.type) {
                if (item.quantity > itemToUse.quantity) {
                    item.modifyQuantity(-itemToUse.quantity);
                    Notifications.create("Used" + itemToAdd.getQuantity() + " " + itemToAdd.getName());
                } else if (item.quantity === itemToUse.quantity) {
                    inventory.splice(i, 1);
                    Notifications.create("Used" + itemToAdd.getQuantity() + " " + itemToAdd.getName());
                } else {
                    Notifications.create("Can't use!");
                }
                break;
            } else {
                Notifications.create("Can't use!");
            }
        }
        World.drawinventory();
    };

    Player.prototype.act = function () {
        World.engine.lock();

        window.addEventListener("keydown", this.handleEvent);
    };

    Player.prototype.move = function (dX, dY) {

        var nextTile = World.map.getTile(this._x + dX, this._y + dY);

        if (nextTile.getContent()[0]) {
            Player.itemAcquired(nextTile.getContent()[0]);
            nextTile.getContent().splice(0, 1);
        }

        if (!(nextTile.isWalkable())) {
            return;
        }

        this._x = Math.max(0,
            Math.min(World.map._width - 1, this._x + dX));
        this._y = Math.max(0,
            Math.min(World.map._height - 1, this._y + dY));
    };

    Player.prototype.handleEvent = function (e) {
        if (e.keyCode === ROT.VK_LEFT) {
            World.player.move(-1, 0);
        } else if (e.keyCode === ROT.VK_RIGHT) {
            World.player.move(1, 0);
        } else if (e.keyCode === ROT.VK_UP) {
            World.player.move(0, -1);
        } else if (e.keyCode === ROT.VK_DOWN) {
            World.player.move(0, 1);
        }

        World.render();

        window.removeEventListener("keydown", this);
        World.engine.unlock();
    };

    root.Player = Player;
}(this));
