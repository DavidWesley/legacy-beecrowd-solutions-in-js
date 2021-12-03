const { readFileSync } = require("fs")
const numbers = readFileSync("/dev/stdin", "utf8").split(' ').map(Number.parseFloat)

const biggerNumber = (nums) => Math.max(...nums)

function main() {
    const bigger = biggerNumber(numbers)
    console.log(`${bigger} eh o maior`)
}

main()