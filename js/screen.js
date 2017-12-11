(function (root) {
    "use strict";

    var Screen = {};
    Screen.gameScreenInit = function () {
        let options = {
            width: 40,
            height: 20,
            fontSize: 20,
            forceSquareRatio: true,
            fontFamily: "Metrickal",
            spacing: 1.10
        };

        return new ROT.Display(options);
    };
    Screen.helpScreenInit = function () {
        let options = {
            width: 40,
            height: 20,
            fontSize: 20,
            fontFamily: "Metrickal",
        };

        var display = new ROT.Display(options);
        display.drawText(1, 2, "Press 'k' then a direction key to inspect tiles.");
        display.drawText(1, 5, "Press 'h' then a direction key to harvest.");
        display.drawText(1, 8, "Press any key to return to game.");
        return display;
    };

    Screen.drawScreen = function (screen) {
        World.asciiDiv.className += "inactive";
        setTimeout(function () {
            World.asciiDiv.remove();
        }, 1000);

        if (World.containerDiv.hasChildNodes()) {
            World.containerDiv.removeChild(World.containerDiv.childNodes[0]);
        }
        World.containerDiv.appendChild(screen.getContainer());
    };

    root.Screen = Screen;
}(this));