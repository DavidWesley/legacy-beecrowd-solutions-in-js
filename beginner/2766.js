const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n", 10)

console.log(input[2])
console.log(input[6])
console.log(input[8])
