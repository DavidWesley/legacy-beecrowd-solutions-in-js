const { readFileSync } = require("fs")
const [numCases, ...cases] = readFileSync("/dev/stdin", "utf8").split("\n")

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

	const responses = []

	for (let index = 0; index < +numCases * 2; index += 2) {
		const currentText = cases[index]
		const currentSearchWord = cases[index + 1]
		const wordIndexesOnTextList = findWordPositionsFromText(currentSearchWord, currentText)

		responses.push(wordIndexesOnTextList.join(" "))
	}

	console.log(responses.join("\n"))
}

main()