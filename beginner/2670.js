const { readFileSync } = require("node:fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 3)
	.map((value) => Number.parseInt(value, 10))

console.log(
	Math.min(
		B * 2 + C * 4,
		A * 2 + C * 2,
		A * 4 + B * 2
	)
)
