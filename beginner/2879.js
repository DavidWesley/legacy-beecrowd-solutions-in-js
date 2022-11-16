const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1 + 1e4)
	.map((value) => Number.parseInt(value, 10))

console.log(
	input
		.splice(0, numLines)
		.filter((gate) => gate !== 1)
		.length
)
