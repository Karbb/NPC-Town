"use strict";

var Camp = {
    display: null,
    container: document.getElementById("map"),
    map: {},
    init: function () {
        var options = {
            width: 20,
            height: 8,
            fontSize: 18,
            forceSquareRatio: true
        }
        this.display = new ROT.Display(options);
        if (Camp.container.hasChildNodes()) {
            Camp.container.removeChild(Camp.container.childNodes[0]);
        }
        Camp.container.appendChild(this.display.getContainer());
        this.generateMap();
    },
    generateMap: function () {
        var digger = new ROT.Map.Digger();

        var digCallback = function (x, y, value) {
            if (value) { return; } /* do not store walls */

            var key = x + "," + y;
            this.map[key] = ".";
        };
        digger.create(digCallback.bind(this));
        this.drawWholeMap();
    },
    drawWholeMap: function () {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    },

}