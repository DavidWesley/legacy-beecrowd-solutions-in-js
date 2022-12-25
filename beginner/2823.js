const { readFileSync } = require("node:fs")
const [[N], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 10 + 1)
	.map((line) => line.split(" ", 2).map(value => Number.parseInt(value, 10)))

console.log(
	input.splice(0, N).reduce((total, [C, P]) => total + (C / P), 0) <= 1
		? "OK"
		: "FAIL"
)
