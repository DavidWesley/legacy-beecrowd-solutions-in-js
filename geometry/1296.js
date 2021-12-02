const { readFileSync } = require("fs")
const sidesList = readFileSync("/dev/stdin", "utf8")
	.split('\n')
	.map(line => line.split(' ').slice(0, 3).map(Number.parseFloat))

function perimeter([...sides]) {
	return sides.reduce((sum, side) => sum + side, 0)
}

function heronFormula([...sides]) {
	const semiperimeter = perimeter(sides) / 2
	return Math.sqrt(sides.map(side => semiperimeter - side).reduce((acc, value) => acc * value, semiperimeter))
}

function main() {
	const responses = []

	for (const sides of sidesList) {
		if (sides.includes(NaN)) break

		else if ((perimeter(sides) / 2) - Math.max(...sides) < 0 || sides.includes(0)) responses.push(`${(-1).toFixed(3)}`)
		else responses.push(`${((4.0 / 3.0) * heronFormula(sides) || -1).toFixed(3)}`)
	}

	console.log(`${responses.join('\n')}`)
}

main()