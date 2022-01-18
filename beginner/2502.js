const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const numbersRegex = /\d+/gi
const upperCaseRegex = /[A-Z]+/
const lowerCaseRegex = /[a-z]+/

const isDigit = (str = "") => RegExp(numbersRegex, "i").test(str)
const isUppercase = (str = "") => RegExp(upperCaseRegex, "").test(str)
const isLowercase = (str = "") => RegExp(lowerCaseRegex, "").test(str)


/**
 * @param {string[]} encryptedStrList
 * @param {{firstCypher: string, secondCypher: string}} cypher
 */

function decryptStringsList(encryptedStrList, cypher = { firstCypher: '', secondCypher: '' }) {
	const { firstCypher, secondCypher } = cypher
	const defaultCyphersLength = Math.min(firstCypher.length, secondCypher.length)

	const [normalizedFirstCypher, normalizedSecondCypher] = [firstCypher, secondCypher].map((cypher) => [...cypher.toLowerCase()])

	const cypherMap = new Map()

	for (let index = 0; index < defaultCyphersLength; index++) {
		const normalizedCharFromFirstCypher = normalizedFirstCypher[index]
		const normalizedCharFromSecondCypher = normalizedSecondCypher[index]

		cypherMap.set(normalizedCharFromFirstCypher, normalizedCharFromSecondCypher)
		cypherMap.set(normalizedCharFromSecondCypher, normalizedCharFromFirstCypher)
	}

	return encryptedStrList.map((text) => {
		const modifiedText = [...text].map((char) => {
			const normalizedChar = char.toLowerCase()

			if (cypherMap.has(normalizedChar)) {
				let replacedText = cypherMap.get(normalizedChar)

				if (isDigit(char)) return replacedText
				else if (isLowercase(char)) return replacedText
				else if (isUppercase(char)) return replacedText.toUpperCase()
				else return replacedText
			}

			return char
		})

		return modifiedText.join("")
	})
}

function main() {
	const responses = []

	while (input.length > 0) {
		if (input[0] === '') break //= EOF condition, necessary for accpeted code

		const [C, N] = input.shift().split(" ").map((value) => Number.parseInt(value, 10))
		const [firstCypher, secondCypher] = input.splice(0, 2)

		const encryptedPhrasesList = input.splice(0, N)
		const decryptedPhrasesList = decryptStringsList(encryptedPhrasesList, { firstCypher: firstCypher, secondCypher: secondCypher })

		responses.push(`${decryptedPhrasesList.join('\n')}\n`)
	}

	console.log(responses.join("\n"))
}

main()
