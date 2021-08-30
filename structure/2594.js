const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/dev/stdin", "utf8").split('\n')

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

	const responses = [...Array(+numTestCases)].map((_, i) => {
		const currentText = cases.shift()
		const currentSearchWord = cases.shift()

		const wordIndexesOnTextList = findWordPositionsFromText(currentSearchWord, currentText)

		return wordIndexesOnTextList.join(' ')
	})

	console.log(`${responses.join('\n')}`)
}

main()