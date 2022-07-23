const { readFileSync } = require("node:fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((pair) => pair
		.split(" ", 2)
		.map((value) => Number.parseInt(value, 10))
	)

class Factorial {
	static #list = new Map([
		[0, 1n], [1, 1n]
	])

	/** @param {number} nth */
	static get(nth) {
		if (Factorial.#list.has(nth))
			return Factorial.#list.get(nth)

		let value = Factorial.#list.get(Factorial.#list.size - 1)

		for (let f = Factorial.#list.size; f <= nth; f++) {
			value *= BigInt(f)
			Factorial.#list.set(f, value)
		}

		return Factorial.#list.get(nth)
	}
}


function main() {
	const responses = []
	const MAX_LIMIT_FACTORIAL = 20

	for (const [factA, factB] of input) {
		if (Number.isNaN(factA) || Number.isNaN(factB)) break // EOFile Condition Verification
		if (Math.max(factA, factB) > MAX_LIMIT_FACTORIAL) continue // No Greater than 20 Condition verification

		responses.push(Factorial.get(factA) + Factorial.get(factB))
	}

	console.log(responses.join("\n"))
}

main()