const { readFileSync } = require("fs")
const [input] = readFileSync("/dev/stdin", "utf8").split("\n", 1)

/**
 * Binet formula implementation to calculate fibonacci numbers
 * @param {number} nth
 */
function binetFormule(nth) {
	nth = Math.floor(Math.max(0, nth))
	if (nth <= 0) return 0

	const sqrt5 = Math.sqrt(5)
	const A = Math.pow((1 + sqrt5) / 2, nth) / sqrt5
	const B = Math.pow((1 - sqrt5) / 2, nth) / sqrt5

	return Math.round(A + B)
}

function main() {
	const nthFibonacciIndex = Number.parseInt(input, 10)
	const nthFibonacciValue = binetFormule(nthFibonacciIndex)

	console.log(nthFibonacciValue.toFixed(2))
}

main()
