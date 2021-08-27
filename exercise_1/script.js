'use strict'
let names = ['Hummingbird', 'Hornbill', 'Hawaiian Crow', 'Cebu Flowerpecker',
            'Pheasant',  'Canary', 'Turkey', 
            'Goose', "Crow", 'Penguin' ]


let nameToDisplay = names.pop();
let checkFromTheStart = true;
let id = 0;
 

// Displays the name in <p> element and deletes the all ready existing <p> elements incase we start over or reset.
function showName() {
    let nodes = document.getElementById("word-container").children;
    for (let i = 0; i < nodes.length; i++) {
        console.log(nodes[i]);
        nodes[i].remove();
    }
    let para = document.createElement('p');
    para.textContent = nameToDisplay;
    para.id = id.toString();
    para.addEventListener('change', handleChange);
    document.getElementById("word-container").appendChild(para);
    document.getElementById('remaining').innerHTML = names.length + 1;
}


/*Checks if the string that is currently displayed in a <p> element is empty.
 if true -> displayNewWord();
 Also check if we need initialize the programs state back to start.*/
function handleChange() {
    let str = document.getElementById(id).innerHTML;
    console.log(str);
    if (str.length === 0) {
        displayNewWord();
    }
    checkIfStartOver();
}


// If there are no names to display function calls the reset() 
function checkIfStartOver() {
    console.log(nameToDisplay);
    if (names.length === 0 && nameToDisplay === undefined) {
        reset()
    }
}


// Displays a new name and and formats the value of checkFromTheStart
function displayNewWord() {
    nameToDisplay = names.pop();
    id++;
    checkFromTheStart = true;
    showName();
}


// Handle keypress event by deleting the occurances from the string if the inputted key is correct. If deletation happens, it updates the currently displayed word.
function handleKeyPressed(e) {
    let deleteOccurances = false;
    let succes = false;
    let replace = `${e.key}`;
    let regex = new RegExp(replace,'ig');
    
    if (checkFromTheStart) {
            deleteOccurances = checkIfMatches(nameToDisplay.trim().toLowerCase()[0],e.key);
            
            if(deleteOccurances) {
                nameToDisplay = nameToDisplay.replaceAll(regex,'');
                succes = true;
            }
            if (succes) {
                checkFromTheStart = !checkFromTheStart;
            }
            update();
            return;
    }

    if (!checkFromTheStart) {
        deleteOccurances = checkIfMatches(nameToDisplay.trim().toLowerCase()[nameToDisplay.length-1],e.key);
            if(deleteOccurances) {
                nameToDisplay = nameToDisplay.replaceAll(regex,'');
                succes = true;
            }
            if (succes) {
                checkFromTheStart = !checkFromTheStart;
            }
            update();
            return;
    }
}


// Updates the word which is displayed.
function update() {
    nameToDisplay = nameToDisplay.trimStart();
    document.getElementById(id).innerHTML = nameToDisplay.trim();
    handleChange();
    displayLeftRight();
    document.getElementById('remaining').innerHTML = names.length + 1;
}


// Displays the the "traffic lights" which helps the use to keep track of their progression.
function displayLeftRight() {
    if (checkFromTheStart) {
        document.getElementById('left').style.borderTop = '3px solid green';
        document.getElementById('right').style.borderTop = '5px solid black';
        return;
    }
    document.getElementById('right').style.borderTop = '3px solid green';
    document.getElementById('left').style.borderTop = '5px solid black';
}


function checkIfMatches(c1, c2) {
    console.log(c1 + ' ' + c2);
    if (c1 == c2) {
        return true;
    }
    return false;
}


function handleShowKey(e) {
    document.getElementById('letter-box').innerHTML = 'Input: ' + e.key + '';
}


// Resets everything back to the start. 
function reset() {
    document.getElementById(id).remove();
    names = ['Hummingbird', 'Hornbill', 'Hawaiian Crow', 'Cebu Flowerpecker',
            'Pheasant',  'Canary', 'Turkey', 
            'Goose', "Crow", 'Penguin' ]

     nameToDisplay = names.pop();
     checkFromTheStart = true;
     id = 0;
     
    displayLeftRight();
    let nodes = document.getElementById("word-container").children;
    for (let i = 0; i < nodes.length; i++) {
        console.log(nodes[i]);
        nodes[i].remove();
    }
    document.getElementById('remaining').innerHTML = names.length + 1;
    showName();    
}


document.addEventListener('keydown', handleKeyPressed);
document.addEventListener('keydown', handleShowKey);
document.getElementById('button').addEventListener('click', reset);

showName();
displayLeftRight();