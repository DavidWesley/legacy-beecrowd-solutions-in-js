const { readFileSync } = require("node:fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(Number.parseFloat)

function baskharaRoots(a, b = 0, c = 0) {
	let first = null, second = null
	const delta = Math.pow(b, 2) - 4 * a * c

	if (delta >= 0 && a !== 0) {
		first = (-b + Math.sqrt(delta)) / (2 * a)
		second = (-b - Math.sqrt(delta)) / (2 * a)
	}

	return [first, second]
}

function main() {
	const [firstRootValue, secondRootValue] = baskharaRoots(A, B, C)

	if (!secondRootValue && !firstRootValue)
		console.log("impossivel calcular")
	else {
		console.log("R1 = %s", firstRootValue.toFixed(5))
		console.log("R2 = %s", secondRootValue.toFixed(5))
	}
}

main()
