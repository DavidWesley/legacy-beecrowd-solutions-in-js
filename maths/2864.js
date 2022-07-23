const { readFileSync } = require("node:fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(Number.parseFloat))

const verticeY = (a, b, c) => {
	const delta = Math.pow(b, 2) - 4 * a * c
	const yV = -(delta / (4 * a))
	return yV
}

function main() {
	const responses = lines
		.slice(0, numLines)
		.map(([a, b, c]) => verticeY(a, b, c))
		.map(v => v.toFixed(2))

	console.log(responses.join("\n"))
}

main()