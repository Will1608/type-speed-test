const textArea = document.getElementById('displayField');
const wordCountDisplay = document.getElementById('wordCount');

const charPerLine = 125;
const textAreaHeigth = 4;

let wordList = null;
let keyPressCount = 0;
let wordCount = 0;

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const trackKeyPress = (event) => {
    
    if(event.key === textArea.innerText[keyPressCount]){
        console.log(event.key);
        textArea.children.item(keyPressCount).className = "correctLetter";
        keyPressCount ++;

        if(event.key === " "){
            wordCount ++;
            updateWordCountDisplay();
        }
    }
    
    else if(event.key === "Backspace"){
        if(keyPressCount != 0){
            keyPressCount --;
            textArea.children.item(keyPressCount).removeAttribute("class");

            if(textArea.innerText[keyPressCount] === " "){
                wordCount --;
                updateWordCountDisplay();
            }
        }
    }
    else{
        textArea.children.item(keyPressCount).className = "incorrectLetter";
        keyPressCount ++;
    }
    


};

const updateWordCountDisplay = () => {
    wordCountDisplay.innerText = `${wordCount}`;
}; 
const getWordList = async () => {
    const response = await fetch('wordlist.txt');
    const wordListAsString = await response.text();
    return wordListAsString.split('\n');
}

const fillEntireTextArea = async () => {
    for (let i = 0; i < textAreaHeigth; i++){
        textArea.innerHTML += await getNewTextAreaRow();
    }
}

const getNewTextAreaRow = async () => {
    if(wordList === null){
        wordList = await getWordList();
    }

    let textAreaRowRowValue = "";
    let chosenWord = "";
    let i = 0;

    while(i < charPerLine){
        chosenWord =  wordList.random();
        if(i + chosenWord.length + 1 < charPerLine){
            for(let c of chosenWord){
                textAreaRowRowValue += `<span>${c}</span>`
            }
        }
        i += chosenWord.length + 1;
    }
    return textAreaRowRowValue;
}