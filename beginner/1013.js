const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
const numbers = input.split(' ').map(Number.parseFloat)

const biggerNumber = (nums) => Math.max(...nums)

function main() {
    const bigger = biggerNumber(numbers)
    console.log(`${bigger} eh o maior`)
}

main()