const { readFileSync } = require("fs")
const [numSides] = readFileSync("/dev/stdin", "utf8").split("\n")

const numPaisFromSideInKites = (n = 0) => 0.5 * n * (n - 1) - n

console.log(numPaisFromSideInKites(Number.parseInt(numSides, 10)))