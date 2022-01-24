const { readFileSync } = require("fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split(" ")
	.slice(0, 2)
	.map(value => Number.parseInt(value, 10))

console.log((A / B).toFixed(2))