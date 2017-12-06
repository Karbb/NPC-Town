(function (root) {
"use strict";

function Item(name, description, quantity) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
};

Item.prototype.modifyQuantity = function (value) {
    this.quantity += value;
};
root.NPCT.Item = Item;
}(this));