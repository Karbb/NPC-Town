"use strict";

class Player {
    constructor(x, y, location, items) {
        this._x = x;
        this._y = y;
        this.location = location;
        this.items = items;
        this.drawRoguelike();
    }

    drawRoguelike() {
        World.display.draw(this._x, this._y, "@", "#ff0");
    }

    itemAcquired(itemToAdd) {
        var itemExisting = null;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.name === itemToAdd.name) {
                itemExisting = item;
                break;
            }
        }

        if (itemExisting === null) {
            this.items.push(new Item(itemToAdd.name, itemToAdd.description, itemToAdd.quantity));
        } else {
            itemExisting.modifyQuantity(itemToAdd.quantity);
        }
    }

    itemUsed(itemToUse) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.name === itemToUse.name) {
                if (item.quantity > itemToUse.quantity) {
                    item.modifyQuantity(-itemToUse.quantity);
                } else if (item.quantity === itemToUse.quantity) {
                    this.items.splice(i, 1);
                } else {
                    Notifications.create("Can't use!");
                }
                break;
            } else {
                Notifications.create("Can't use!");
            }
        }
    }

    act() {
        World.engine.lock();

        window.addEventListener("keydown", this.handleEvent);
    }

    handleEvent(e) {
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

        var x = this.World.player._x;
        var y = this.World.player._y;

        var diff = ROT.DIRS[8][keyMap[code]];
        var newX = x + diff[0];
        var newY = y + diff[1];

        var newKey = newX + "," + newY;

        if (!(newKey in World.map)) { return; } /* cannot move in this direction */
        if (!(World.map[newKey] === ".")) { return; }


        World.player._x = newX;
        World.player._y = newY;

        World.player.drawRoguelike();

        World.display.draw(x, y, World.map[x + "," + y]);

        window.removeEventListener("keydown", this);
        World.engine.unlock();
    }


}
