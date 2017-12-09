(function (root) {
    "use strict";

    var Player = function (x, y) {
        this._x = x;
        this._y = y;
        this.drawRoguelike();
    }

    Player.prototype.drawRoguelike = function () {
        NPCT.World.display.draw(this._x, this._y, "@", "#ff0");
    };

    Player.itemAcquired = function (itemToAdd) {
        console.log(itemToAdd);
        var itemExisting = null;
        var inventory = NPCT.World.inventory;

        for (var i = 0; i < inventory.length; i++) {
            var item = inventory[i];
            if (item.type === itemToAdd.type) {
                itemExisting = item;
                break;
            }
        }

        if (itemExisting === null) {
            inventory.push(itemToAdd);
        } else {
            itemExisting.modifyQuantity(itemToAdd.quantity);
        }

        NPCT.World.drawinventory();
    };

    Player.itemUsed = function (itemToUse) {
        var inventory = NPCT.World.inventory;

        for (var i = 0; i < inventory.length; i++) {
            var item = inventory[i];
            if (item.name === itemToUse.name) {
                if (item.quantity > itemToUse.quantity) {
                    item.modifyQuantity(-itemToUse.quantity);
                } else if (item.quantity === itemToUse.quantity) {
                    inventory.splice(i, 1);
                } else {
                    NPCT.Notifications.create("Can't use!");
                }
                break;
            } else {
                NPCT.Notifications.create("Can't use!");
            }
        }
        NPCT.World.drawinventory();
    };

    Player.prototype.act = function () {
        NPCT.World.engine.lock();

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

        var x = NPCT.World.player._x;
        var y = NPCT.World.player._y;


        var diff = ROT.DIRS[8][keyMap[code]];
        var newX = x + diff[0];
        var newY = y + diff[1];

        var newKey = newX + "," + newY;

        if (!(newKey in NPCT.World.map.tiles)) { return; } /* exit */

        if (NPCT.World.map.tiles[newKey].getContent()[0]) {
            Player.itemAcquired(NPCT.World.map.tiles[newKey].getContent()[0]);
            NPCT.World.map.tiles[newKey].getContent().splice(0, 1);
        }

        if (!(NPCT.World.map.tiles[newKey].isWalkable())) { return; }

        NPCT.World.player._x = newX;
        NPCT.World.player._y = newY;

        NPCT.World.player.drawRoguelike();

        NPCT.World.display.draw(x, y, NPCT.World.map.tiles[x + "," + y].getIcon());

        window.removeEventListener("keydown", this);
        NPCT.World.engine.unlock();
    };

    root.NPCT.Player = Player;
}(this));
