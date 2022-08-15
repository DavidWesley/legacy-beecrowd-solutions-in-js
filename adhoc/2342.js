const { readFileSync } = require("fs")
const [N, expression] = readFileSync("/dev/stdin", "utf8").split("\n", 2)

console.log(Number.parseInt(N, 10) >= eval(expression) ? "OK" : "OVERFLOW")