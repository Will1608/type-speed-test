const targetTextArea = document.getElementById('inputField');
const textAreaWidth = targetTextArea.cols;
const textAreaHeigth = targetTextArea.rows;

let wordList = null;

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const getWordList = async () => {
    const response = await fetch('wordlist.txt');
    const wordListAsString = await response.text();
    return wordListAsString.split('\n');
}

const fillEntireTextArea = async () => {
    let textAreaContents = "";
    for (let i = 0; i < textAreaHeigth; i++){
        textAreaContents += await getNewTextAreaRow();
    }

    targetTextArea.value = textAreaContents;
}

const getNewTextAreaRow = async () => {
    if(wordList === null){
        wordList = await getWordList();
    }

    let textAreaRowRowValue = "";
    let chosenWord = "";
    let i = 0;

    while(i < textAreaWidth){
        chosenWord =  wordList.random();
        if(i + chosenWord.length + 1 < textAreaWidth){
            textAreaRowRowValue += chosenWord + " ";
        }
        i += chosenWord.length + 1;
    }

    return textAreaRowRowValue;
}