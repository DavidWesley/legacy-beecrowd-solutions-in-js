/**
 * A optimised Javascript program to find the number of digits in a factorial
 * Returns the number of digits present in n!
 * Since the result can be large long long is used as return type
 * @param {number} n
 */
function kamenetskyFormula(n) {
	if (n < 0) return 0
	if (n <= 1) return 1

	// Use Kamenetsky formula to calculate the number of digits
	const numDigits = n * (Math.log10(n) - Math.LOG10E) + Math.log10(2 * Math.PI * n) / 2.0

	return Math.floor(numDigits) + 1
}

const { readFileSync } = require("fs")

const [N] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(num => Number.parseInt(num, 10))

console.log(kamenetskyFormula(N))
