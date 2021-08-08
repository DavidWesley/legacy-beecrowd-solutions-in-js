const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

// const isVowel = (char = '') => char.length === 1 && /[aeiou]/gi.test(char)
const isVowel = (char = '') => ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())
const isConsonant = (char = '') => char.length === 1 && /(?![aeiou])[a-z]/gi.test(char)

const consonantsIndexes = (word = "") => [...word]
	.reduce((acc, curr, currIndex) => {
		if (isConsonant(curr)) acc.push(currIndex)
		return acc
	}, [])

const vowelsIndexes = (word = "") => [...word]
	.reduce((acc, curr, currIndex) => {
		if (isVowel(curr)) acc.push(currIndex)
		return acc
	}, [])

const returnVowelsFromWord = (word = "") => Array.from(word).filter(isVowel)
const returnConsonantsFromWord = (word = "") => Array.from(word).filter(isConsonant)

function moveConsonants(word = "", moveFrom = 0) {

	const consonantsChars = returnConsonantsFromWord(word)
	const consonantsIndexesArray = consonantsIndexes(word)

	const changedWordArray = changeWord(word, {
		chars: consonantsChars,
		indexes: consonantsIndexesArray,
		condition: isConsonant,
		moveTo: moveFrom
	})

	return showWordState(changedWordArray)
}

function moveVowels(word = "", moveFrom = 0) {
	const vowelsChars = returnVowelsFromWord(word)
	const vowelsIndexesArray = vowelsIndexes(word)

	const changedWordArray = changeWord(word, {
		chars: vowelsChars,
		indexes: vowelsIndexesArray,
		condition: isVowel,
		moveTo: moveFrom
	})

	return showWordState(changedWordArray)
}

function changeWord(word = "", props = { chars: [''], indexes: [0], condition: Function(), moveTo: 0 }) {
	const { chars, indexes, condition, moveTo } = props

	const wordArray = Array.from(word)
	const rearranjedChars = moveChars(condition, chars, moveTo)

	for (let index = 0; index < chars.length; index++) {
		const charsIndex = indexes[index]
		wordArray[charsIndex] = rearranjedChars[index]
	}

	return wordArray
}

function moveChars(condition = Function(), chars = [''], moveToQuantity = 0) {
	const charsLen = chars.length
	const rearranjedChars = Array(charsLen)

	chars.forEach((char, index) => {
		if (condition(char)) {
			const newCharIndex = index + moveToQuantity >= charsLen ? (index + moveToQuantity) % charsLen : index + moveToQuantity
			rearranjedChars[newCharIndex] = char
		}
	})

	return rearranjedChars
}

function showWordState(chars = [""]) {
	return chars.join('')
}

function main() {
	const responses = []

	const numTestCases = parseInt(input.shift())

	for (let testcase = 1; testcase <= numTestCases; testcase++) {
		responses.push(`Caso #${testcase}:`)
		let currentWord = input.shift()
		const commandsLength = parseInt(input.shift())

		for (let command = 0; command < commandsLength; command++) {
			const [commandsdIndex, S] = input.shift().split(' ').map(int => parseInt(int))

			switch (commandsdIndex) {
				case 0:
					currentWord = moveVowels(currentWord, S)
					break
				case 1:
					currentWord = moveConsonants(currentWord, S)
					break
				case 2:
					responses.push(currentWord)
					break
			}
		}
	}

	console.log(responses.join('\n'))
}

main()