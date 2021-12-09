class Stack {
	#items = [];

	push(element) {
		this.#items.push(element)
	}
	pop() {
		return this.#items.pop()
	}
	toArray() {
		return this.#items
	}

	size() {
		return this.#items.length
	}
	peek() {
		return this.#items[this.#items.length - 1]
	}
	isEmpty() {
		return this.size() == 0
	}

	static fromArray(arr = []) {
		const stack = new Stack()
		for (const item of arr) stack.push(item)
		stack
		return stack
	}
}

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function range(start, end, step = 1) {
	const result = []
	const hasSameSign = Math.sign(end - start) === Math.sign(step)

	if (hasSameSign)
		if (step < 0) for (let i = start; i >= end; i += step) result.push(i)
		else if (step > 0) for (let i = start; i <= end; i += step) result.push(i)

	return result
}

const output = []

while (input.length > 0) {
	const numVogons = Number.parseInt(input.shift(), 10)
	if (numVogons === 0) break

	const block = []

	while (true) {
		const permutedVogons = input
			.shift()
			.split(" ")
			.slice(0, numVogons)

		if (permutedVogons[0] === "0") break

		const expected = Stack.fromArray(permutedVogons.reverse())

		const estacaoA = Stack.fromArray(range(numVogons, 1, -1))
		const estacaoB = new Stack()
		const estacaoC = new Stack()

		while (expected.isEmpty() === false) {
			if (estacaoA.peek() == expected.peek()) {
				estacaoB.push(estacaoA.pop())
				expected.pop()
			} else if (estacaoC.peek() == expected.peek()) {
				estacaoB.push(estacaoC.pop())
				expected.pop()
			} else if (estacaoA.isEmpty() == false) {
				estacaoC.push(estacaoA.pop())
			} else break
		}

		block.push(estacaoB.size() === numVogons ? "Yes" : "No")
	}

	output.push(block.join("\n"))
}

console.log(`${output.join("\n\n")}\n`)