const { readFileSync } = require("node:fs")

const [L, C] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

console.log(
	(L + C) % 2 === 0 ? "1" : "0"
)