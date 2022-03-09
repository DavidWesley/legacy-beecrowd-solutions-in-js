const { readFileSync } = require("fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8").split("\n")

console.log("%s%s%s", A, B, C)
console.log("%s%s%s", B, C, A)
console.log("%s%s%s", C, A, B)
console.log("%s%s%s", A.substring(0, 10), B.substring(0, 10), C.substring(0, 10))