const { readFileSync } = require("node:fs")

const [totalFigures, boughtFigures, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))

function main() {
	const figures = lines.slice(0, boughtFigures)
	const uniqueFigures = new Set(figures)

	console.log(totalFigures - uniqueFigures.size)
}

main()