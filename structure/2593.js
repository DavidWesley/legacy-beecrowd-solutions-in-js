const { readFileSync } = require("fs")
const [text, wordsQuantities, joinedWords] = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {string} word
 * @param {string} text
 */

function findWordPositionsFromText(word, text) {
	const regexGeneratedFromWord = RegExp(`\\b${word}\\b`, "dg")
	const matchedIndexes = [...text.matchAll(regexGeneratedFromWord)]

	return matchedIndexes.length ? matchedIndexes.map(match => match.index) : [-1]
}

function main() {
	const wordsList = joinedWords.split(" ", +wordsQuantities)

	const responses = wordsList.map(word => {
		const wordIndexesOnTextList = findWordPositionsFromText(word, text)
		return wordIndexesOnTextList.join(" ")
	})

	console.log(responses.join("\n"))
}

main()