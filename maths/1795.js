const { readFileSync } = require("fs")
const [lineIndex] = readFileSync("/dev/stdin", "utf8").split("\n")

const Pow = (base, exponent) => BigInt(base) ** BigInt(exponent)

console.log(Pow(3, lineIndex))