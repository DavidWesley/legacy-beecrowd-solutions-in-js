const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const RegexesEnum = {
	get numbers() { return /\d+/gi },
	get upperCase() { return /[A-Z]+/ },
	get lowerCase() { return /[a-z]+/ },
}

const Chars = {
	isChar: (str = "") => str.length === 1,
	isDigit: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.numbers, "i").test(char),
	isUppercase: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.upperCase, "").test(char),
	isLowercase: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.lowerCase, "").test(char),
}

/**
 * @param {string[]} encryptedStrList
 * @param {{firstCypher: string, secondCypher: string}} cypher
 */

function decryptStringsList(encryptedStrList, cypher = { firstCypher: '', secondCypher: '' }) {
	const { firstCypher, secondCypher } = cypher

	const [normalizedFirstCypher, normalizedSecondCypher] = [firstCypher, secondCypher].map((cypher) => cypher.toLowerCase().replace(/\W/g, ""))
	const defaultCyphersLength = Math.min(normalizedFirstCypher.length, normalizedSecondCypher.length)

	const cypherMap = new Map()

	for (let index = 0; index < defaultCyphersLength; index++) {
		const normalizedCharFromFirstCypher = normalizedFirstCypher.charAt(index)
		const normalizedCharFromSecondCypher = normalizedSecondCypher.charAt(index)

		cypherMap.set(normalizedCharFromFirstCypher, normalizedCharFromSecondCypher)
		cypherMap.set(normalizedCharFromSecondCypher, normalizedCharFromFirstCypher)
	}

	return encryptedStrList.map((text) => {
		const modifiedText = text.replace(/\w/g, (char) => {
			const normalizedChar = char.toLowerCase()

			if (cypherMap.has(normalizedChar)) {
				const replacedText = cypherMap.get(normalizedChar)

				if (Chars.isDigit(char)) return replacedText
				else if (Chars.isLowercase(char)) return replacedText
				else if (Chars.isUppercase(char)) return replacedText.toUpperCase()
				else return replacedText
			}

			return char
		})

		return modifiedText
	})
}

function main() {
	const responses = []

	while (input.length > 0) {
		if (input.includes("")) break //= EOF condition

		const [, N] = input.shift().split(" ").map((value) => Number.parseInt(value, 10))
		const [firstCypher, secondCypher] = input.splice(0, 2)

		const encryptedPhrasesList = input.splice(0, N)
		const decryptedPhrasesList = decryptStringsList(encryptedPhrasesList, { firstCypher: firstCypher, secondCypher: secondCypher })

		responses.push(decryptedPhrasesList.join("\n"), "")
	}

	console.log(responses.join("\n"))
}

main()
