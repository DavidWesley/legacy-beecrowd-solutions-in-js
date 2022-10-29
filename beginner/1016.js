const { readFileSync } = require("fs")

const [distance] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

function distanceBetween(space = 0) {
	const [carX, carY] = [60, 90]
	const distanceTax = Math.abs(carX - carY) / 60

	return Math.round(space / distanceTax)
}

console.log("%d minutos", distanceBetween(distance))
