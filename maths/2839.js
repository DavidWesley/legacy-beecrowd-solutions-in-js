const { readFileSync } = require("fs")
const [numPairs] = readFileSync("/dev/stdin", "utf8").split("\n")

console.log(Number.parseInt(numPairs, 10) + 1)