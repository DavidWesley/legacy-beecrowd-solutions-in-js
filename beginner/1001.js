const { readFileSync } = require("node:fs")
const [x, y] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

console.log("X = %d", x + y)
