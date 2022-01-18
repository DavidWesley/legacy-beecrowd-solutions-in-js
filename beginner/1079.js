const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(Number.parseFloat))

function weigthAverage(A = 0, B = 0, C = 0) {
	return (2 * A + 3 * B + 5 * C) / 10
}

function main() {
	const responses = lines.slice(0, +numLines).map(([a, b, c]) => weigthAverage(a, b, c).toFixed(1))
	console.log(responses.join("\n"))
}

main()
