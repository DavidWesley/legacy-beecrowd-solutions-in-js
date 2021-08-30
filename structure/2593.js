const { readFileSync } = require("fs")
const [text, wordsQuantitiesValues, wordsJoined] = readFileSync("/dev/stdin", "utf8").split('\n')

/**
 * @param {string} word
 * @param {string} text
 */

function findWordPositionsFromText(word, text) {
	const regexGeneratedFromWord = RegExp(`\\b${word}\\b`, 'g')
	const matchedIndexes = [...text.matchAll(regexGeneratedFromWord)]

	return matchedIndexes.length ? matchedIndexes.map(match => match.index) : [-1]
}

function main() {
	const responses = []
	const wordsList = wordsJoined.split(' ')

	wordsList.slice(0, +wordsQuantitiesValues).forEach(word => {
		const wordIndexesOnTextList = findWordPositionsFromText(word, text)
		const formattedWordIndexesList = wordIndexesOnTextList.join(' ')

		responses.push(formattedWordIndexesList)
	})

	console.log(`${responses.join('\n')}`)
}

main()