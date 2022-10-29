const { readFileSync } = require("node:fs")
const [X, Y] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

console.log("PROD = %d", X * Y)
