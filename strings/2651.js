const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const wordInput = input.shift()

function linkMoodFromSurname(surnameLink) {
    const surname = String(surnameLink).toLowerCase()
    return `Link ${surname.includes("zelda") ? "Bolado" : "Tranquilo"}`
}

function main() {
    const responses = linkMoodFromSurname(wordInput)
    console.log(responses)
}

main()