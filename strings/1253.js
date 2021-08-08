const input = require('fs').readFileSync('/dev/stdin', 'utf-8');

const numTestCases = input.match(/^\d+$/gm)[0];
const testCases = input.match(/^(\w{1,50})\s+(\d{1,2})$/gm);
const originalTexts = [];

for (let index in testCases) {
    if (index === numTestCases) break;
    const [text, rightWardPositions] = testCases[index].split(/\s+/g);
    const originalText = upperCharToOriginalPosition(text, rightWardPositions);
    originalTexts.push(originalText);
}

function upperCharToOriginalPosition(word, positions) {
    const [min, max] = [65, 90];
    const pos = +positions;

    const originalText = word.split('').map(char => {
        const actualPosision = char.charCodeAt();

        let originalCharPosition = actualPosision - pos;
        if (originalCharPosition < min) originalCharPosition = max + actualPosision - (min + pos) + 1;

        return String.fromCharCode(originalCharPosition);
    }).join('');

    return originalText;
}

console.log(originalTexts.join("\n"));