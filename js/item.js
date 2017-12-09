(function (root) {
"use strict";

function Item(type, quantity) {
    this.type = type;
    this.quantity = quantity;
};

Item.prototype.modifyQuantity = function (value) {
    this.quantity += value;
};

Item.Berry = {
    name : "Berry",
    description : "A berry gathered in the woods",
    icon : "*",
    value : 5
};

Item.Money = {
    name : "Money",
    description : "The ol' money",
    value : 1
};

root.NPCT.Item = Item;
}(this));