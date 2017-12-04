"use strict";

class Player {
    constructor(items) {
        this.items = items;
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
    
    draw() {
        var parentDiv = document.getElementById("inventory");
        parentDiv.innerHTML = '';

        this.items.forEach(item => {
            let string = document.createElement('p');
            string.innerHTML = item.name + ": " + item.quantity;
            string.title = item.description;
            parentDiv.appendChild(string);
        });
    }
}
