const { readFileSync } = require("fs")
const [R] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

const PI = 3.14
console.log((2 * R * PI).toFixed(2))
