class Stack {
	#items = []

	push(element) { this.#items.push(element) }
	pop() { return this.#items.pop() }

	toArray() { return this.#items }
	isEmpty() { return this.size == 0 }

	get size() { return this.#items.length }
	get peek() { return this.#items.at(-1) }

	/** @param {Array<any> | Generator<any, any, any>} arr */
	static fromArray(arr) {
		const stack = new Stack()
		for (const item of arr) stack.push(item)
		return stack
	}
}

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {number} start The start of the range.
 * @param {number} stop The stop of the range.
 * @param {number} step The value to increment or decrement by.
 */
function* range(start = 0, stop, step = 1) {
	if (isNaN(stop)) {
		// one param defined
		[stop, start] = [start, 0]
	}

	for (
		let value = start;
		step > 0 ? value < stop : value > stop;
		value += step
	) {
		yield value
	}
}

const output = []

while (input.length > 0) {
	const numWagons = Number.parseInt(input.shift(), 10)
	if (numWagons === 0) break

	const block = []

	while (input.length > 0) {
		const permutedWagons = input
			.shift()
			.split(" ")
			.slice(0, numWagons)

		if (permutedWagons[0] === "0") break

		const expected = Stack.fromArray(permutedWagons.reverse())

		const stationA = Stack.fromArray(range(numWagons, 1, -1))
		const stationB = new Stack()
		const stationC = new Stack()

		while (expected.isEmpty() === false) {
			if (stationA.peek == expected.peek) {
				stationB.push(stationA.pop())
				expected.pop()
			} else if (stationC.peek == expected.peek) {
				stationB.push(stationC.pop())
				expected.pop()
			} else if (stationA.isEmpty() == false) {
				stationC.push(stationA.pop())
			} else break
		}

		block.push(stationB.size === numWagons ? "Yes" : "No")
	}

	output.push(block.join("\n"), "")
}

console.log(output.join("\n"))