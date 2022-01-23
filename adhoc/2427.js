const { readFileSync } = require("fs")
const [size] = readFileSync("/dev/stdin", "utf8").split("\n")

const squaresFromSize = (size) => 2 ** (Math.floor(Math.log2(size)) * 2)

console.log(squaresFromSize(+size))