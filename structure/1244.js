const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const numTestCases = input.shift()
const wordsSequences = input.map((wordsSequence) => wordsSequence.split(" "))

function main() {
	const responses = []

	for (const [index, wordsSequence] of Object.entries(wordsSequences)) {
		if (index === numTestCases) break
		const sortedWords = wordsSequence.sort((a, b) => b.length - a.length)

		responses.push(sortedWords.join(" "))
	}

	console.log(responses.join("\n"))
}

main()