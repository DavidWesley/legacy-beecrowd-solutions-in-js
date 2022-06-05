const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

class Stack {
	#items = []

	push(element) { this.#items.push(element) }
	pop() { return this.#items.pop() }

	toArray() { return this.#items }
	isEmpty() { return this.size == 0 }

	get size() { return this.#items.length }
	get peek() { return this.#items.at(-1) }

	static fromArray(arr = []) {
		const stack = new Stack()
		for (const item of arr) stack.push(item)
		return stack
	}
}

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map(countDiamondsInString)

	console.log(responses.join("\n"))
}

main()

function countDiamondsInString(cs = "") {
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
	const comparatorsMatchesArray = Array.from(cs.match(/[<>]/g) || [])

	for (const comparator of comparatorsMatchesArray) {
		if (comparator === details.codes.comparator.LTS)
			comparatorStack.push(comparator)
		else if (comparator === details.codes.comparator.GTS && comparatorStack.isEmpty() === false) {
			comparatorStack.pop()
			diamonds += 1
		}
	}

	return diamonds
}