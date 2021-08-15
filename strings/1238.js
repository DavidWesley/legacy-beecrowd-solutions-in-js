const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const responses = []
const [[numTestCases], ...wordsPairsList] = input.map(words => words.split(' '))

function replaceAndJoinWords([first, last]) {
    const [firstWord, lastWord] = [[...first], [...last]]
    const resultWord = []

    for (let i = 0; i < Math.max(firstWord.length, lastWord.length); i++)
        resultWord.push(firstWord[i] ?? '', lastWord[i] ?? '')

    return resultWord.join("")
}

function main() {
    for (const [index, [firstWord, lastWord]] of Object.entries(wordsPairsList)) {
        if (index === numTestCases) break
        const result = replaceAndJoinWords([firstWord, lastWord])
        responses.push(result)
    }

    console.log(responses.join('\n'))
}

main()