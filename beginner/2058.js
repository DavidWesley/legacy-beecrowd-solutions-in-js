const { readFileSync } = require("fs")
const [numSides] = readFileSync("/dev/stdin", "utf8").split("\n")

console.log(Number.parseInt(numSides, 10) - 2)