const { readFileSync } = require("node:fs")
const [[N, M], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 101)
	.map((line) => line.split(" ", 100).map(value => Number.parseInt(value, 10)))

console.log(
	input
		.filter((handballPlayerStatics) => handballPlayerStatics.every(points => points > 0))
		.length
)
