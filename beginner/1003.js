const { readFileSync } = require("node:fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

console.log("SOMA = %d", A + B)
