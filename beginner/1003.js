const { readFileSync } = require("fs")
const inputs = readFileSync("/dev/stdin", "utf8")

const [A, B] = inputs.split("\n").map(int => Number.parseInt(int))
const sums = (/** @type {number[]} */...values) => values.reduce((acc, cur) => cur + acc, 0)

function main() {
    const sum = sums(A, B)
    console.log(`SOMA = ${sum}`)
}

main()