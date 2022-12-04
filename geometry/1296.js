const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 3).map(Number.parseFloat))

function perimeter([...sides]) {
	return sides.reduce((sum, side) => sum + side, 0)
}

function heronFormula([...sides]) {
	const semiperimeter = perimeter(sides) / 2
	return Math.sqrt(
		sides
			.map(side => semiperimeter - side)
			.reduce((total, value) => total * value, semiperimeter)
	)
}

function main() {
	const output = []

	for (const medians of input) {
		if (medians.includes(NaN)) break // EOF
		else if ((perimeter(medians) / 2) - Math.max.apply(null, medians) < 0 || medians.includes(0)) output.push(-1)
		else output.push((4.0 / 3.0) * heronFormula(medians) || -1)
	}

	console.log(output.map((value) => value.toFixed(3)).join("\n"))
}

main()
