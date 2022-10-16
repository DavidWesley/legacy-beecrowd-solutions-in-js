const { readFileSync } = require("node:fs")
const [[numCases], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(value => Number.parseInt(value, 10)))

class FixedHashTable {
	#mod
	#adjacencyList

	#hash(value) { return value % this.#mod }

	constructor(size) {
		this.#mod = size
		this.#adjacencyList = new Map()

		for (let node = 0; node < size; node++)
			this.#adjacencyList.set(node, new Array())
	}

	insert([...values]) {
		for (const value of values) {
			const node = this.#hash(value)
			this.#adjacencyList.get(node).push(value)
		}

		return this
	}

	print() {
		return Array
			.from(this.#adjacencyList.entries(), ([key, values]) => [key, ...values, "\\"].join(" -> "))
			.join("\n")
	}
}

function main() {
	const output = []

	for (let i = 0; i < numCases && input.length > 0; i++) {
		const [[baseAdressesNum, keysNum], keysList] = input.splice(0, 2)
		const fixedHashTable = new FixedHashTable(baseAdressesNum).insert(keysList.slice(0, keysNum))

		output.push(fixedHashTable.print())
	}

	console.log(output.join("\n\n"))
}

main()
