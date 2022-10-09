const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.toLowerCase()
	.split("\n", 2)


function main() {
	const output = input.sort((wordA, wordB) => {
		return wordA.localeCompare(wordB, "en-US")
	})

	console.log(output.join("\n"))
}

main()
