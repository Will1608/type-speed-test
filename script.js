const textArea = document.getElementById('displayField');
const minutesField = document.getElementById('minutes');
const secondsField = document.getElementById('seconds');
const wordCountDisplay = document.getElementById('wordCount');

const charsPerLine = 38;
const displayLineCount = 4;

let wordList = null;
let linesToDisplay = [];

let remainingSeconds = 10;
let timer = null;

let istestRunning = false;
let isTestFinished = false;

let keyPressCount = 0;
let typedChars = [];

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const trackKeyPress = (event) => {
    if(remainingSeconds === 10 && !istestRunning && !isTestFinished){
        timer = setInterval(startTimer, 1000);
        istestRunning = true;
    }
    if(istestRunning){

        if(event.key === "Backspace"){
            if(keyPressCount > 0){
                typedChars.pop();
                textArea.children.item(keyPressCount - 1).className = "";
            }
        }
        else{
            typedChars.push(event.key);
            textArea.children.item(keyPressCount).className = getLetterClass(textArea.innerText[keyPressCount], typedChars[keyPressCount]);
        }
        keyPressCount = typedChars.length;
    }
}

const getLetterClass = (expected, actual) => {
    return expected===actual? "correctLetter" : "incorrectLetter";
}

const startTimer = () => {
    remainingSeconds--;
    minutesField.innerText = 0;
    secondsField.innerText = remainingSeconds;
    if(remainingSeconds == 0){
        clearInterval(timer);
        istestRunning = false;
        isTestFinished = false;
        console.log(typedChars);
    }
}

const getWordList = async () => {
    if(wordList === null){
        const response = await fetch('wordlist.txt');
        const wordListAsString = await response.text();
        wordList = wordListAsString.split('\n');
    }

    return wordList;
}

const getNewLine = async () => {

    wordList = await getWordList();
    let newLine = [];
    let charOnLine = 0;

    while(charOnLine < charsPerLine){
        chosenWord =  wordList.random();

        if((charOnLine + chosenWord.length) < charsPerLine){
            newLine.push(chosenWord);
        }
        charOnLine += chosenWord.length;
    }

    return newLine;
}

const updateLinesToDisplay = async () => {
    while(linesToDisplay.length < 4){
        linesToDisplay.push(await getNewLine());
    }

    displayLines();
};

const displayLines = () => {
    textArea.innerHTML = linesToDisplay.map(line => 
                                            line.map(word => 
                                                     word.split("").map(letter =>
                                                                        `<span>${letter}</span>`).join("")).join("<span> </span>")).join("<span> </span>");
}
