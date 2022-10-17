const textArea = document.getElementById('displayField');
const wordCountDisplay = document.getElementById('wordCount');

const wordsPerLine = 6;
const displayLineCount = 4;

let wordList = null;
let keyPressCount = 0;
let wordCount = 0;

let linesToDisplay = [];

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const trackKeyPress = (event) => {
    
    if(event.key === textArea.innerText[keyPressCount]){
        console.log(event.key);
        textArea.children.item(keyPressCount).className = "correctLetter";
        updateWordCount(event.key, textArea.innerText[keyPressCount]);

        keyPressCount ++;

    }

    else if(event.key === "Backspace"){
        if(keyPressCount != 0){
            keyPressCount --;
            textArea.children.item(keyPressCount).removeAttribute("class");

            updateWordCount(event.key, textArea.innerText[keyPressCount]);
        }
    }

    else{
        textArea.children.item(keyPressCount).className = "incorrectLetter";
        keyPressCount ++;
    }
};

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

    for(let i = 0; i < wordsPerLine; i++){
        newLine.push(chosenWord =  wordList.random());
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
    
    textArea.innerHTML = linesToDisplay.map(line => line.map(word => `<span>${word} </span>`).join(" ")).join("</br>");
}
