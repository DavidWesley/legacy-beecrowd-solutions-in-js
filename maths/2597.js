const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => Number.parseInt(line, 10))

function countNonSquaredNumbersOnInterval(max, min = 0) {
	const count = (n = 0) => n - Math.floor(Math.sqrt(n))
	return count(max) - count(min)
}

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map((num) => countNonSquaredNumbersOnInterval(num, 0))

	console.log(responses.join("\n"))
}

main()