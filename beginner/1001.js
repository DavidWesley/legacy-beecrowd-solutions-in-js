const { readFileSync } = require("fs")
const [x, y] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

const sum = x + y

console.log(`X = ${sum}`)