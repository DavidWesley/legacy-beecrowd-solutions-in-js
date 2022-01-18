// Economic Solution, but restricted

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function gracehopper(words, separator = " ", targetWord) {
	targetWord = targetWord.toUpperCase()

	return words
		.replace(/\b(\w)(\w*)(\w)\b/g, "$1$3")
		.toUpperCase()
		.split(separator)
		.every((pairs, index) => pairs.includes(targetWord.charAt(index))) // Must be ordened!
}

function main() {
	const responses = []
	const TARGET = "COBOL"

	for (const words of input) {
		if (words === "") break // EOFile Condition Verification

		const isMatched = gracehopper(words, "-", TARGET)
		responses.push(isMatched ? "GRACE HOPPER" : "BUG")
	}

	console.log(responses.join("\n"))
}

main()