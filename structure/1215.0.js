const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1e4)
	.map(line => line.toLowerCase().split(/[\W\b\s_\d]+/gi))


function main() {
	const /** @type {Set<string>} */ uniqueWordsSet = new Set()

	for (const line of input) {
		for (const word of line) {
			if (word === "") continue // Filtering empty strings
			else uniqueWordsSet.add(word)
		}
	}

	// Dictionary
	const output = Array
		.from(uniqueWordsSet.values())
		.sort((strA, strB) => strA.localeCompare(strB, "en-US"))

	console.log(output.join("\n"))
}

main()
