const { readFileSync } = require("node:fs")
const [size] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))


class Fibonacci {
	static #list = new Map([[0, 0], [1, 1], [2, 1]])

	/**
	 * Binet formula implementation to calculate fibonacci numbers
	 * @param {number} nth
	 */
	static calc(nth) {
		nth = Math.floor(Math.max(0, nth))
		if (nth <= 0) return 0

		const sqrt5 = Math.sqrt(5)
		const A = Math.pow((1 + sqrt5) / 2, nth) / sqrt5
		const B = Math.pow((1 - sqrt5) / 2, nth) / sqrt5

		return Math.round(A + B)
	}

	/** @param {number} nth */
	static get(nth) {
		const fList = Fibonacci.#list
		nth = Math.floor(Math.max(0, nth))

		if (nth === 0) return 0
		else if (fList.has(nth)) return fList.get(nth)
		else if (fList.has(nth - 1) && fList.get(nth - 2)) fList.set(nth, fList.get(nth - 1) + fList.get(nth - 2))
		else fList.set(nth, Fibonacci.calc(nth)) // Linear Method, prevent long time recursive calls

		return fList.get(nth)
	}

	/** @param {number} size */
	static sequence(size) {
		// Calc and save in memory
		return Array.from({ length: size }, (_, index) => Fibonacci.get(index))
	}
}


function main() {
	const fibonacciSequence = Fibonacci.sequence(size)
	console.log(fibonacciSequence.join(" "))
}

main()