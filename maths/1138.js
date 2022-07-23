const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2).map(value => Number.parseInt(value, 10)))


class DigitsCounter {
	/**
	 * A private object memory that contains all calculates list
	 * to improve CPU performance
	 */
	static #memo = {}

	/**
	 * @param {number} num
	 * @param {number} digit
	 * @returns {number}
	 */
	static occurrences(num, digit) {
		const K = Math.trunc(Math.log10(num))

		if (K === 0) return num >= digit ? 1 : 0

		const tenPowK = Math.pow(10, K)
		const tenPowKMinus1 = tenPowK / 10

		const A = Math.trunc(num / tenPowK)
		const B = num % tenPowK

		if (A < digit) return (A * K) * tenPowKMinus1 + (B === 0 ? 0 : this.occurrences(B, digit))
		else if (A === digit) return (A * K) * tenPowKMinus1 + 1 + (B === 0 ? 0 : this.occurrences(B, digit)) + B
		else if (A > digit) return (A * K + 10) * tenPowKMinus1 + (B === 0 ? 0 : this.occurrences(B, digit))

		return 0
	}

	/** @param {number} num */
	static total(num) {
		if (num < 10) return num + 1

		const K = Math.trunc(Math.log10(num))
		const tenPowK = Math.pow(10, K)

		const A = Math.trunc(num / tenPowK)
		const B = num % tenPowK

		let sum = 0

		for (let s = 1; s <= K; s++)
			sum += 9 * s * Math.pow(10, s - 1)

		return (K + 1) * (B + 1 + (A - 1) * tenPowK) + sum + 1
	}

	/**
	 * @param {number} num
	 * @returns {number[]}
	 */
	static occurrencesList(num) {
		if (Reflect.has(DigitsCounter.#memo, num)) return DigitsCounter.#memo[num]

		let sum = 0
		const list = Array(10).fill(0)

		for (let digit = 1; digit <= 9; digit++) {
			list[digit] = this.occurrences(num, digit)
			sum += list[digit]
		}

		// Tratamento especial para o ZERO:
		list[0] = this.total(num) - sum
		Reflect.set(DigitsCounter.#memo, num, list)
		return list
	}
}

function main() {
	const responses = []

	for (const [A, B] of input) {
		if (A === 0 && B === 0) break // EOFile Condition

		// For Zero Value we need of this Special Tratament
		const X = A !== 0 ? A - 1 : 0
		const Y = B

		const min = DigitsCounter.occurrencesList(X)
		const max = DigitsCounter.occurrencesList(Y)

		const result = Array.from({ length: 10 }, (_, i) => max[i] - min[i])

		responses.push(result.join(" "))
	}

	console.log(responses.join("\n"))
}

main()