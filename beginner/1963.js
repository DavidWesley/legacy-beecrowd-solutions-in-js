const { readFileSync } = require("fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(Number.parseFloat)

const percentage = ((B - A) / A) * 100.0

console.log(percentage.toFixed(2))