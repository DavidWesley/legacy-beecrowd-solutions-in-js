const { readFileSync } = require("fs")
const lineIndex = BigInt(readFileSync("/dev/stdin", "utf8").split('\n')[0])

const Pow = (base, exponent) => BigInt(base) ** BigInt(exponent)

console.log(`${Pow(3, lineIndex)}`)