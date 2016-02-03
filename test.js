(function () {
    // Container for audio
    var possibleAudioTests = ['c', 'h', 'k', 'l', 'q', 's', 'r', 't'];

    // Container for locations of squares, skipping the center square
    var possibleSquares = [0, 1, 2, 3, 5, 6, 7, 8];

    // Container for colors
    var possibleColors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'gray', 'brown'];

    // Container for selections
    var selections = [];

    // Class for selection
    var CurrentSelection = function (letter, loc, color) {
        this.letter = letter;
        this.loc = loc;
        this.color = color;
    };

    // Create a selection
    var makeSelection = function () {
        var audioIndex = Math.floor(Math.random() * possibleAudioTests.length);
        var squareIndex = Math.floor(Math.random() * possibleSquares.length);
        var colorIndex = Math.floor(Math.random() * possibleColors.length);
        return new CurrentSelection(possibleAudioTests[audioIndex], possibleSquares[squareIndex], possibleColors[colorIndex]);
    };

    // Helper to check if functions match
    var checkMatch = function (obj1, obj2) {
        return {
            letter: obj1.letter === obj2.letter,
            loc: obj1.loc === obj2.loc,
            color: obj1.color === obj2.color
        }
    };
    
    // Helper to list an array of all match results
    var listAllAnswers = function (selections, n) {
        var results = [];
        for (var i = 0; i < selections.length; i++) {
            if (i < n) {
                continue;
            } else {
                results.push(checkMatch(selections[i], selections[i - n]));
            }
        }
        return results;
    };

    //Helper to count the array of all match results
    var countAllAnswers = function (selections) {
        var list = listAllAnswers(selections, 2);
        var counter = {
            letter: 0,
            loc: 0,
            color: 0
        };
        for (var i = 0; i < list.length; i++) {
            for (var key in list[i]) {
                if (list[i][key]) {
                    counter[key] = counter[key] + 1;
                }
            }
        }
        return counter;
    };

    var generatedSelections = [];

    // Start every 2 seconds
    var init = function (i) {
        if (i === undefined) {
            i = 0;
        } else if (i < 30) {
            generatedSelections.push(makeSelection());
            console.log(generatedSelections.length);
        } else {
            console.log(generatedSelections);
            console.log(countAllAnswers(generatedSelections));
            return;
        }
        setTimeout(function () {
            init(i + 1)
        }, 2000);
    };

    init();

}())