(function (root) {
    "use strict";

    var Player = function (x, y) {
        this._x = x;
        this._y = y;
        this.drawRoguelike();
    };

    Player.prototype.drawRoguelike = function () {
        World.display.draw(this._x, this._y, "@", "#ff0");
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

    Player.prototype.handleEvent = function (e) {
        var keyMap = {};
        keyMap[38] = 0;
        keyMap[33] = 1;
        keyMap[39] = 2;
        keyMap[34] = 3;
        keyMap[40] = 4;
        keyMap[35] = 5;
        keyMap[37] = 6;
        keyMap[36] = 7;

        var code = e.keyCode;

        if (!(code in keyMap)) { return; }

        var x = World.player._x;
        var y = World.player._y;

        var diff = ROT.DIRS[8][keyMap[code]];
        var newX = x + diff[0];
        var newY = y + diff[1];

        var newKey = newX + "," + newY;

        if (!(newKey in World.map.tiles)) { return; } /* exit */

        if (World.map.tiles[newKey].getContent()[0]) {
            Player.itemAcquired(World.map.tiles[newKey].getContent()[0]);
            World.map.tiles[newKey].getContent().splice(0, 1);
        }

        if (!(World.map.tiles[newKey].isWalkable())) { return; }

        World.player._x = newX;
        World.player._y = newY;

        World.player.drawRoguelike();

        World.display.draw(x, y, World.map.tiles[x + "," + y].getIcon());

        window.removeEventListener("keydown", this);
        World.engine.unlock();
    };

    root.Player = Player;
}(this));
