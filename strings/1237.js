const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const charCodes = (str = '') => [...str].map(char => char.charCodeAt(0))

function main() {
    while (input.length > 0) {
        const [firstWord, secondWord] = input.splice(0, 2)
        console.log(charCodes(firstWord), charCodes(secondWord))
    }
}

main()