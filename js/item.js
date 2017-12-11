(function (root) {
    "use strict";

    function Item(itemType, quantity) {
        this.setType(itemType);
        this.quantity = quantity || 1;
    };

    Item.prototype.modifyQuantity = function (value) {
        this.quantity += value;
    };

    Item.prototype.setType = function (itemType) {
        this.type = Item[itemType];
    };

    Item.prototype.getName = function () {
        return this.type.name;
    };

    Item.prototype.getPluralName = function () {
        return this.type.pluralName;
    };

    Item.prototype.getQuantity = function () {
        return this.quantity;
    };

    Item.prototype.getIcon = function () {
        return this.type.icon;
    };

    Item.prototype.getForeground = function () {
        return this.type.foreground;
    };

    Item.Berry = {
        name: "berry",
        pluralName: "berries",
        description: "A berry gathered in the woods",
        icon: "*",
        foreground: "#ff0000",
        value: 5
    };

    Item.Money = {
        name: "money",
        description: "The ol' money",
        value: 1
    };

    root.Item = Item;
}(this));