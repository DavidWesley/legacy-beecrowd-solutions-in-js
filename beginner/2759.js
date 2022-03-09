const { readFileSync } = require("fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8").split("\n")

console.log("A = %s, B = %s, C = %s", A, B, C)
console.log("A = %s, B = %s, C = %s", B, C, A)
console.log("A = %s, B = %s, C = %s", C, A, B)