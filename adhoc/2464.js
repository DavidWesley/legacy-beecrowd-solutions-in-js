const { readFileSync } = require("fs")
const [sequence, encryptedText] = readFileSync("/dev/stdin", "utf8").split("\n")

class CipherDecoder {
	#cypher
	constructor(initSequence) {
		const ORDENED_ALPHABET = "abcdefghijklmnopqrstuvwxyz"

		this.#cypher = new Map(
			Array.from([...initSequence.substring(0, ORDENED_ALPHABET.length)], (char, index) => [char, ORDENED_ALPHABET.charAt(index)])
		)
	}

	decrypt(encryptedText = "") {
		return [...encryptedText].map(char => this.#cypher.get(char.toLowerCase()) ?? char).join("")
	}
}

function main() {
	const decryptedText = new CipherDecoder(sequence).decrypt(encryptedText)
	console.log(decryptedText)
}

main()