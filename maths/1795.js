const { readFileSync } = require("node:fs")
const [R] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

console.log(Math.pow(3, R))
