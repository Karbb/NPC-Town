"use strict";

var Farm = {
    map: {},
    init: function () {
        var options = {
            width: 20,
            height: 3,
            fontSize: 16,
            forceSquareRatio: true,
        }

        World.display = new ROT.Display(options);
        if (World.container.hasChildNodes()) {
            World.container.removeChild(World.container.childNodes[0]);
        }
        World.container.appendChild(World.display.getContainer());

        World.display.drawText(4,  1, "Coming Soon!");
    },
};