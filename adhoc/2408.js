const { readFileSync } = require("fs")

const [, B,] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(value => Number.parseInt(value, 10))
	.sort((a, b) => a - b)

console.log(B)