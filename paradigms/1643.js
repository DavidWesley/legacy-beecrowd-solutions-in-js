const { readFileSync } = require("node:fs")
const [T, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2.5e4 + 1)
	.map((value) => Number.parseInt(value, 10))

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

class BruceAlgorithm {
	static #SIZE = 22

	static decToFibNotation(num = 0) {
		const notation = new Uint8Array(this.#SIZE)
		for (let index = this.#SIZE; index > 0 && num > 0; index--) {
			const fib = binetFormule(index + 1)
			if (num >= fib) {
				Atomics.store(notation, this.#SIZE - index, 1)
				num -= fib
			}
		}

		return notation
	}

	/** @param {ArrayLike<number>} notation */
	static fibToDecNotation(notation) {
		let result = 0
		for (let index = 1; index < notation.length; index++)
			result += notation.at(-index) * binetFormule(index + 1)

		return result
	}
}

function convertKilometersToMilesFromBruceAlgorithm(distance = 0) {
	return BruceAlgorithm.fibToDecNotation(BruceAlgorithm.decToFibNotation(distance).subarray(0, -1))
}

function main() {
	const output = Array.from(
		{ length: T },
		(_, index) => convertKilometersToMilesFromBruceAlgorithm(input.at(index))
	)

	console.log(output.join("\n"))
}

main()
