
const { readFileSync } = require("fs")
const [X, Y] = readFileSync("./dev/stdin", "utf8").split("\n").map(int => parseInt(int))

const products = (...values) => values.reduce((acc, cur) => cur * acc, 1)

function main() {
    const product = products(X, Y)
    console.log(`PROD = ${product}`)
}

main()