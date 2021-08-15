const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')
const inputNumber = Number.parseInt(input.shift())

const responses = []

function main() {
    for (let i = 2; i <= inputNumber; i += 2) {
        const squareNumber = i ** 2
        responses.push(`${i}^2 = ${squareNumber}`)
    }

    console.log(responses.join('\n'))
}

main()