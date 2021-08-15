const { readFileSync } = require("fs")
const [numTestCases, ...texts] = readFileSync("/dev/stdin", "utf8").split('\n')

const responses = []

function criptgraph(text) {
    let criptWord = criptOne(text)
    criptWord = criptTwo(criptWord)
    criptWord = criptThree(criptWord)

    return criptWord
}

function main() {
    for (const [index, text] of Object.entries(texts)) {
        if (index === numTestCases) break
        const textCripted = criptgraph(text)
        responses.push(textCripted)
    }

    console.log(responses.join('\n'))
}

main()

function criptOne(text) {
    return [...text].map(char => {
        return /[a-zA-Z]/.test(char) ? String.fromCharCode(char.charCodeAt(0) + 3) : char
    }).join('')
}

function criptTwo(text) {
    if (text.length < 2) return text
    return [...text.toString()].reverse().join('')
}

function criptThree(text) {
    const len = text.length
    const limit = Math.trunc(len / 2)
    const originalText = text.substr(0, limit)
    const processedText = [...text.substr(limit, (len <= 1 ? limit + 1 : len - 1))].map(char => String.fromCharCode(char.charCodeAt(0) - 1)).join('')

    return `${originalText}${processedText}`
}