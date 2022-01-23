const { readFileSync } = require("fs")
const [dividend, divisor] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.slice(0, 2)
	.map(num => Number.parseInt(num, 10))

console.log(dividend % divisor)