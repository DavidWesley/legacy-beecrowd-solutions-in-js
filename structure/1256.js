const { readFileSync } = require("fs")
const [[numCases], ...cases] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(Number))

class FixedHashTable {
	#mod
	#hashTable

	#hash(value) { return value % this.#mod }

	constructor(size) {
		this.#mod = size
		this.#hashTable = new Map()
		for (let index = 0; index < size; index++) this.#hashTable.set(index, new Array())
	}

	insert([...values]) {
		for (const value of values) {
			const key = this.#hash(value)
			this.#hashTable.get(key).push(value)
		}

		return this
	}

	print() {
		const print = Array.from(this.#hashTable.entries(), ([key, values]) => [key, ...values, "\\"].join(" -> "))
		return print.join("\n")
	}
}

function main() {
	const responses = []

	for (let index = 0; cases.length > 0; index++) {
		if (index === numCases) break

		const [[baseAdressesNum, keysNum], keysList] = cases.splice(0, 2)
		const hashTable = new FixedHashTable(baseAdressesNum).insert(keysList.slice(0, keysNum))
		const formattedHashTable = hashTable.print()

		responses.push(formattedHashTable)
	}

	console.log(responses.join("\n\n"))
}

main()