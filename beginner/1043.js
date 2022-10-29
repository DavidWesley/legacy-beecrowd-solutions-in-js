const { readFileSync } = require("fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(value => Number.parseInt(value, 10))

const isNegative = (num) => Number(num) <= 0
const trianglePerimeter = (a, b, c) => a + b + c
const trapezeArea = (b, B, h) => ((B + b) * h) / 2

function main() {
	const isValidTriangle = isTriangle(A, B, C)

	if (isValidTriangle) console.log(`Perimetro = ${trianglePerimeter(A, B, C).toFixed(1)}`)
	else console.log(`Area = ${trapezeArea(A, B, C).toFixed(1)}`)
}

main()

function isTriangle(a, b, c) {
	const sides = [a, b, c].sort((a, b) => a - b)

	if (sides.some(isNegative)) return false
	else if (sides[0] + sides[1] <= sides[2]) return false
	else return true
}
