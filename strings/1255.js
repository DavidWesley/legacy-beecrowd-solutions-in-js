const { readFileSync } = require("fs")
const [numTestCases, ...textsList] = readFileSync("./dev/stdin", "utf8").split('\n')

function eachCharQuantity(arrChar = [], dictChar = {}) {
	for (const char in dictChar) {
		const quantityChar = arrChar.filter(letter => letter === char).length
		dictChar[char] = quantityChar
	}

	return dictChar
}

function biggerFrequency(dictChar = {}) {
	return Math.max(...Object.values(dictChar))
}

function mostFrequentChars(dictChar = {}) {
	const biggerFrequencyValue = biggerFrequency(dictChar)
	const mostFrequentCharsEntries = Object.entries(dictChar).filter(([_, frequency]) => frequency === biggerFrequencyValue)

	return mostFrequentCharsEntries.map(([char]) => char)
}

function counterLetter(letters = "") {
	const lettersArray = [...letters]
	const lettersSet = new Set(lettersArray)
	const lettersEntries = Array.from(lettersSet, (letter) => [letter, 0])
	const lettersDictionary = eachCharQuantity(lettersArray, Object.fromEntries(lettersEntries))

	return mostFrequentChars(lettersDictionary)
}

function main() {
	const responses = []

	for (const [index, text] of Object.entries(textsList)) {
		if (index === numTestCases) break

		const charsInText = text.toLowerCase().replace(/[^a-z]+/gm, '')
		const mostFreqLettersArr = counterLetter(charsInText)
		const reqCharsJoined = mostFreqLettersArr.sort((a, b) => a.localeCompare(b, 'pt-BR')).join('')

		responses.push(reqCharsJoined)
	}

	console.log(responses.join('\n'))
}

main()