const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

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
	const responses = []

	for (let i = 0; i < input.length; i++) {
		if (input[i] == "0") break // EOF
		else responses.push(binetFormule(Number.parseInt(input[i], 10) + 1))
	}

	console.log(responses.join("\n"))
}

main()
