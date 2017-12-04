"use strict";

class Item {
    constructor(name, description, quantity) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
    }

    modifyQuantity(value) {
        this.quantity += value;
    }
}
