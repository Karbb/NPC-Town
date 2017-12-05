"use strict";

var Building = [
    {
        name: "Shop",
        description: "",
        owned: false,
        price: 1000,
        init: function () {

        }
    },
    {
        name: "Alchemist",
        description: "",
        owned: false,
        price: 2000,
        init: function () {

        }
    },
    {
        name: "Farm",
        description: "",
        owned: false,
        price: 500,
        init: function () {
            return Farm.init();
        }
    },
    {
        name: "Outside",
        description: "Not inside :D",
        owned: true,
        price: 0,
        init: function () {
            return Outside.init();
        }
    }
];