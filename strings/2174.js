const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const TOTAL_OF_UNIQUE_POMEKONS = 151
const myUniquePomekons = new Set(lines.slice(0, Number.parseInt(numLines, 10)))

console.log("Falta(m) %d pomekon(s).", TOTAL_OF_UNIQUE_POMEKONS - myUniquePomekons.size)