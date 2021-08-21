const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")[0]

function BinetFormule(nth) {
	const sqrt5 = Math.sqrt(5)
	const nthPower = equation => (Math.pow((equation / 2), nth)) / sqrt5

	return Math.round(
		nthPower(1 + sqrt5) - nthPower(1 - sqrt5)
	)
}

function main() {
	const nthFibonacciIndex = Number.parseInt(input, 10)
	const nthFibonacciValue = BinetFormule(nthFibonacciIndex)

	console.log(`${nthFibonacciValue.toFixed(2)}`)
}

main()
