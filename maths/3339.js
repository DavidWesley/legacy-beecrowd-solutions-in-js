const { readFileSync } = require("node:fs")
const [[Q], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1e3 + 1)
	.map((line) => line.split(" ", 2).map((value) => Number.parseInt(value, 10)))

const countPerfectSquaresInRangeInclusive = (min = 0, max = min) => {
	return 1 + Math.floor(Math.sqrt(max)) - Math.ceil(Math.sqrt(min))
}

const output = Array.from(
	{ length: Q },
	(_, index) => countPerfectSquaresInRangeInclusive(...input[index])
)

console.log(output.join("\n"))
