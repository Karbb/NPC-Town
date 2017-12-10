(function (root) {
    "use strict";

    var Player = function (x, y) {
        this._x = x;
        this._y = y;
        this.state = "MOVE";
        this.action = "";
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
        } else {
            itemExisting.modifyQuantity(itemToAdd.quantity);
        }

        Notifications.create("Added " + itemToAdd.getQuantity() + " " + itemToAdd.getName());

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
        if (this._x + dX < 0 || this._x + dX > World.map._width || this._y + dY < 0 || this._y + dY > World.map._height) {
            return;
        }

        var nextTile = World.map.getTile(this._x + dX, this._y + dY);

        if (!(nextTile.isWalkable())) {
            return;
        }

        if (nextTile.getContent()[0]) {
            Player.itemAcquired(nextTile.getContent()[0]);
            nextTile.getContent().splice(0, 1);
        }

        this._x = Math.max(0,
            Math.min(World.map._width - 1, this._x + dX));
        this._y = Math.max(0,
            Math.min(World.map._height - 1, this._y + dY));
    };

    Player.prototype.handleEvent = function (e) {
        if (World.player.state === "MOVE") {
            if (e.keyCode === ROT.VK_LEFT) {
                World.player.move(-1, 0);
            } else if (e.keyCode === ROT.VK_RIGHT) {
                World.player.move(1, 0);
            } else if (e.keyCode === ROT.VK_UP) {
                World.player.move(0, -1);
            } else if (e.keyCode === ROT.VK_DOWN) {
                World.player.move(0, 1);
            } else if (e.keyCode === ROT.VK_H) {
                World.player.state = "INTERACT";
                World.player.action = Player.prototype.harvest;
                return;
            } else if (e.keyCode === ROT.VK_K) {
                World.player.state = "INTERACT";
                World.player.action = Player.prototype.inspect;
                return;
            } else if (e.keyCode === ROT.VK_BACK_SLASH) {

                World.player.state = "HELP_SCREEN";
                World.player.drawHelpscreen();
                return;
            }
        } else if (World.player.state === "INTERACT") {
            if (e.keyCode === ROT.VK_LEFT) {
                World.player.action.call(this, -1, 0);
            } else if (e.keyCode === ROT.VK_RIGHT) {
                World.player.action.call(this, 1, 0);
            } else if (e.keyCode === ROT.VK_UP) {
                World.player.action.call(this, 0, -1);
            } else if (e.keyCode === ROT.VK_DOWN) {
                World.player.action.call(this, 0, 1);
            }
        } else if (World.player.state === "HELP_SCREEN") {
            if (e.keyCode) {
                World.player.state = "MOVE";
            }
        }

        World.render();
        window.removeEventListener("keydown", this);
        World.engine.unlock();

    };

    Player.prototype.harvest = function (dX, dY) {
        var toHarvestTile = World.map.getTile(World.player._x + dX, World.player._y + dY);
        if (toHarvestTile.isHarvestable()) {
            console.log(toHarvestTile);
            if (toHarvestTile.getContent()[0]) {
                Player.itemAcquired(toHarvestTile.getContent()[0]);
                toHarvestTile.getContent().splice(0, 1);
            } else {
                Notifications.create("This " + toHarvestTile.name + " is empty.");
            }
        }
        World.player.state = "MOVE";
    };

    Player.prototype.inspect = function (dX, dY) {
        var targetTile = World.map.getTile(World.player._x + dX, World.player._y + dY);

        var message = "This is a " + targetTile.name + ".";
        if (targetTile.hasContent()) {
            message = message.concat(" It contains ");
            targetTile.getContent().forEach(element => {
                message = message.concat(element.getQuantity() + " " + (element.getQuantity() > 1 ? element.getPluralName() : element.getName()));
            });
            message = message.concat(".");
        }

        Notifications.create(message);

        World.player.state = "MOVE";
    };

    Player.prototype.drawHelpscreen = function () {
        World.display.clear();
        World.display.drawText(1, 2, "Press 'k' then a direction key to inspect tiles.");
        World.display.drawText(1, 3, "Press 'h' then a direction key to harvest.");
        World.display.drawText(1, 5, "Press any key to return to game.");
    };

    root.Player = Player;
}(this));
