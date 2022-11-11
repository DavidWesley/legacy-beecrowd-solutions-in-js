const { readFileSync } = require("node:fs")
const [numCases, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {string} word
 * @param {string} text
 */
function findWordPositionsFromText(word, text) {
	const regexGeneratedFromWord = RegExp(`\\b${word}\\b`, "gd")
	const matchedIndexes = [...text.matchAll(regexGeneratedFromWord)]
	return matchedIndexes.length ? matchedIndexes.map(match => match.index) : [-1]
}

function main() {
	const output = []

	for (let index = 0; index < Number.parseInt(numCases, 10) * 2; index += 2) {
		const currentText = input[index]
		const currentSearchWord = input[index + 1]
		output.push(findWordPositionsFromText(currentSearchWord, currentText).join(" "))
	}

	console.log(output.join("\n"))
}

main()
