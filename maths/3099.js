const DigitsCounter = {
	/**
	 * @param {number} num
	 * @param {number} digit
	 * @returns {number} quantity of a specified digit from 0 until a number
	 */
	occurrences(num, digit) {
		const K = Math.trunc(Math.log10(num))

		if (K === 0) return num >= digit ? 1 : 0

		const tenPowK = Math.pow(10, K)
		const tenPowKMinus1 = tenPowK / 10

		const A = Math.trunc(num / tenPowK)
		const B = num % tenPowK

		if (A < digit) return (A * K) * tenPowKMinus1 + (B === 0 ? 0 : DigitsCounter.occurrences(B, digit))
		else if (A === digit) return (A * K) * tenPowKMinus1 + 1 + (B === 0 ? 0 : DigitsCounter.occurrences(B, digit)) + B
		else if (A > digit) return (A * K + 10) * tenPowKMinus1 + (B === 0 ? 0 : DigitsCounter.occurrences(B, digit))

		return 0
	}
}


const { readFileSync } = require("node:fs")
const [num] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

// Output
console.log(DigitsCounter.occurrences(num, 1) + DigitsCounter.occurrences(num, 7))