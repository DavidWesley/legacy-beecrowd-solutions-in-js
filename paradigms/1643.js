function binetFormule(nth) {
	if (nth < 0) return 0
	const sqrt5 = Math.sqrt(5)
	const nthPower = (equation) => Math.pow(equation / 2, nth) / sqrt5

	return Math.round(nthPower(1 + sqrt5) - nthPower(1 - sqrt5))
}

class BruceAlgorithm {
	static #SIZE = 22
	static #FIBS = new Map(Array.from({ length: this.#SIZE }, (_, i) => [i + 1, binetFormule(i + 2)]))

	static decToFibNotation(num = 0) {
		const notation = new Array(this.#SIZE).fill(0)

		for (let index = this.#SIZE - 1; index > 0 && num > 0; index--) {
			const fib = this.#FIBS.get(index)
			if (num - fib >= 0) {
				notation[this.#SIZE - index] = 1
				num -= fib
			}
		}
		return notation
	}

	static fibToDecNumber(notation = Array(this.#SIZE).fill(0)) {
		let res = 0
		for (let index = 1; index < notation.length; index++)
			res += notation[notation.length - index] * this.#FIBS.get(index)

		return res
	}
}

function convertKilometersToMilesFromBruceAlgorithm(num) {
	const fibNotation = BruceAlgorithm.decToFibNotation(num)
	fibNotation.pop()

	return BruceAlgorithm.fibToDecNumber(fibNotation)
}

const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map((line) => convertKilometersToMilesFromBruceAlgorithm(+line))

	console.log(responses.join("\n"))
}

main()