const { readFileSync } = require("fs")
const [key, numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase()

class VigenèreCipher {
	#CIPHER_TABLE
	#PRIVATE_KEY

	constructor(private_key) {
		this.#PRIVATE_KEY = String(private_key ?? "")
		this.#CIPHER_TABLE = this.#createTable()
	}

	#createTable() {
		const cypherTable = {}

		for (let row = 0; row < this.#PRIVATE_KEY.length; row++) {
			cypherTable[this.#PRIVATE_KEY.charAt(row)] = {}

			for (let col = 0; col < this.#PRIVATE_KEY.length; col++)
				cypherTable[this.#PRIVATE_KEY.charAt(row)][this.#PRIVATE_KEY.charAt(col)] = this.#PRIVATE_KEY.charAt((row + col) % this.#PRIVATE_KEY.length)
		}

		return cypherTable
	}

	encryptText(key, text, from = 0) {
		return Array
			.from(text, (char) => this.#CIPHER_TABLE[key.charAt(from++ % key.length).toUpperCase()][char.toUpperCase()] ?? char)
			.join("")
			.toLowerCase()
	}
}

const vigenèreCipherInstance = new VigenèreCipher(ALPHABET)

function main() {
	const textList = lines.slice(0, +numLines)
	const responses = new Array(+numLines)

	for (const index in textList) {
		const text = textList[index]

		let from = 0

		responses[index] = text.replace(/\b((?![aeiou])[a-z][a-z]+)\b/gi, (match) => {
			const encryptedWord = vigenèreCipherInstance.encryptText(key, match, from)
			from += encryptedWord.length

			return encryptedWord
		})
	}

	console.log(responses.join("\n"))
}

main()