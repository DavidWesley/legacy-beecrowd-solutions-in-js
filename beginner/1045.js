const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(' ')

const [A, B, C] = input.slice(0, 3).map(Number.parseFloat)

function isTriangle(a = 0, b = 0, c = 0) {
	const isNegative = (num) => Number(num) < 0
	const sides = [a, b, c].sort((a, b) => a - b)

	if (sides.some(side => isNegative(side) || side == 0)) return false
	else if (sides[0] + sides[1] <= sides[2]) return false
	else return true
}

function getTriangleTypesFromSides(sides = [0, 0, 0]) {
	const [a, b, c] = sides.sort((a, b) => b - a)

	const triangleTypes = []

	if (!isTriangle(a, b, c)) triangleTypes.push('NAO FORMA TRIANGULO')
	else if (Math.pow(a, 2) == Math.pow(b, 2) + Math.pow(c, 2)) triangleTypes.push('TRIANGULO RETANGULO')
	else if (Math.pow(a, 2) > Math.pow(b, 2) + Math.pow(c, 2)) triangleTypes.push('TRIANGULO OBTUSANGULO')
	else if (Math.pow(a, 2) < Math.pow(b, 2) + Math.pow(c, 2)) triangleTypes.push('TRIANGULO ACUTANGULO')

	if (sides.every(s => s === a)) triangleTypes.push('TRIANGULO EQUILATERO')
	else if (a == b || a == c || b == c) triangleTypes.push('TRIANGULO ISOSCELES')

	return triangleTypes
}

function main() {
	const responses = getTriangleTypesFromSides([A, B, C])
	console.log(responses.join('\n'))
}

main()