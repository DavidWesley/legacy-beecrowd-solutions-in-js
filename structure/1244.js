const { readFileSync } = require("fs")
const [[numLines], ...wordsSequences] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(words => words.split(" "))

function main() {
	const responses = wordsSequences
		.slice(0, +numLines)
		.map(words => {
			return words.sort((a, b) => b.length - a.length).join(" ")
		})

	console.log(responses.join("\n"))
}

main()