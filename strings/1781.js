const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "ascii")
	.split("\n")
	.map((line) => line.split(" "))

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)

const RegexesEnum = {
	get numbers() { return /\d+/gi },
	get vowels() { return /[aeiou]/gi },
	get consonants() { return /(?![aeiou])[a-z]/gi },
	get upperCase() { return /[A-Z]+/ },
	get lowerCase() { return /[a-z]+/ },
	get specialChars() { return /[\W_]/gi }
}

const Chars = {
	isChar: (str = "") => str.length === 1,
	isVowel: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.vowels, "i").test(char),
	isConsonant: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.consonants, "i").test(char)
}

function groupCharIndexesByType(word = "") {
	const vowelsIndexes = []
	const consonantsIndexes = []
	const others = []

	for (let index = 0; index < word.length; index++) {
		const char = word.charAt(index)

		if (Chars.isVowel(char)) vowelsIndexes.push(index)
		else if (Chars.isConsonant(char)) consonantsIndexes.push(index)
		else others.push(char)
	}

	return {
		consonants: consonantsIndexes,
		vowels: vowelsIndexes,
		others: others
	}
}

/**
 * @param {string} word
 * @param {number} movesTo
 * @param {Array<number>} indexes
 */

function moveSpecificChars(word = "", movesTo = 0, indexes) {
	const chars = [...word]

	for (let pos = 0; pos < indexes.length; pos++) {
		const from = indexes[pos]
		const to = indexes[(indexes.length + pos + movesTo) % indexes.length]

		chars[to] = word.charAt(from)
	}

	return chars.join("")
}

function main() {
	const responses = []

	for (let testCaseIndex = 1; testCaseIndex <= +numCases; testCaseIndex++) {
		responses.push(`Caso #${testCaseIndex}:`)

		let word = input.next().value[0]
		const cmdLen = input.next().value[0]

		const { consonants: consonantsIndexes, vowels: vowelsIndexes } = groupCharIndexesByType(word)

		let moveVowels = 0
		let moveConsonants = 0

		for (let cmd = 0; cmd < +cmdLen; cmd++) {
			const [commandsdIndex, S = ""] = input.next().value

			switch (commandsdIndex) {
				case "0": moveVowels += +S; break
				case "1": moveConsonants += +S; break
				case "2":
					word = moveSpecificChars(word, moveVowels, vowelsIndexes)
					word = moveSpecificChars(word, moveConsonants, consonantsIndexes)
					moveVowels = 0
					moveConsonants = 0
					responses.push(word)
					break
			}
		}
	}

	console.log(responses.join("\n"))
}

main()