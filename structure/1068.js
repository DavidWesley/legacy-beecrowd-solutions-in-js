const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n", 1e4)

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
	const output = []

	for (const line of input)
		if (line === "") break
		else output.push(parenthesesValidate(line) ? "correct" : "incorrect")

	console.log(output.join("\n"))
}

main()

function parenthesesValidate(str = "") {
	const details = {
		codes: {
			parenthesis: {
				opened: String.fromCharCode(40), // (
				closed: String.fromCharCode(41), // )
			},
		}
	}

	const openedParenthesesStack = new Stack()

	for (const parenthesis of (str.match(/[()]/g) || [])) {
		if (parenthesis === details.codes.parenthesis.opened)
			openedParenthesesStack.push(parenthesis) // push opened parenthesis
		else if (parenthesis === details.codes.parenthesis.closed && openedParenthesesStack.isEmpty() === false)
			openedParenthesesStack.pop()
		else
			return false // if stack is empty, then there is no opened parenthesis to close
	}

	return openedParenthesesStack.isEmpty()
}
