const { readFileSync } = require("node:fs")
const [N, M] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

console.log((M / (N + 2)).toFixed(2))