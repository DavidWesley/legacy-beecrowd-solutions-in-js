const { readFileSync } = require("node:fs")

const [[size], values] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map((line) => line.split(" ").map(Number.parseFloat))


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

class Primes {
	static #list = {}

	/** @param {number} num */
	static isPrime(num) {
		if (Reflect.has(Primes.#list, num)) return true
		if (num <= 1) return false
		if (num == 2) return true
		if (num % 2 == 0) return false

		const boundary = Math.sqrt(num)

		for (let i = 3; i <= boundary; i += 2)
			if (num % i == 0)
				return false

		Reflect.set(Primes.#list, num, num)
		return true
	}
}


function main() {
	const responses = []

	for (let index = 0; index < size; index++) {
		const value = values[index]

		if (isNaN(value)) break // Unexpected EOF

		if (Primes.isPrime(value))
			responses.push(`${value}! = ${Factorial.get(value)}`)
	}

	console.log(responses.join("\n"))
}

main()