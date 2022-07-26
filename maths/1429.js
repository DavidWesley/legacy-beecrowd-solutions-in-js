const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

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

/** @param {number | string} acm*/

function ACMToDec(acm) {
	return [...`${acm}`]
		.reverse()
		.reduce((sum, decimal, index) => sum + Factorial.get(index + 1) * BigInt(decimal), 0n)
}

function main() {
	const output = []

	for (const line of input) {
		if (line == "0") break
		else output.push(ACMToDec(line))
	}

	console.log(output.join("\n"))
}

main()