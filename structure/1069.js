const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

//// CLASS ////
class Stack {
	#items = []
	push(element) { this.#items.push(element) }
	pop() { return this.#items.pop() }
	toArray() { return this.#items }
	isEmpty() { return this.size == 0 }

	get size() { return this.#items.length }
	get peek() { return this.#items.at(-1) }

	/** @param {Array<unknown>} arr */
	static fromArray(arr) {
		const stack = new Stack()
		for (const item of arr) stack.push(item)
		return stack
	}
}

function main() {
	const output = Array.from(
		{ length: Number.parseInt(numLines, 10) },
		(_, index) => countDiamondsInString(input[index])
	)

	console.log(output.join("\n"))
}

main()

function countDiamondsInString(str = "") {
	const details = {
		codes: {
			comparator: {
				LTS: String.fromCharCode(60), // <
				GTS: String.fromCharCode(62) // >
			}
		}
	}

	let diamonds = 0
	const comparatorStack = new Stack()

	for (const comparator of str.match(/[<>]/g) ?? []) {
		if (comparator === details.codes.comparator.LTS)
			comparatorStack.push(comparator)
		else if (comparator === details.codes.comparator.GTS && comparatorStack.isEmpty() === false) {
			comparatorStack.pop()
			diamonds += 1
		}
	}

	return diamonds
}
