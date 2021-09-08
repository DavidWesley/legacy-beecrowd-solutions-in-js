const { readFileSync } = require("fs")
const [sequence, encryptedText] = readFileSync("/dev/stdin", "utf8").split('\n')

function Cypher(baseSequence = 'abcdefghijklmnopqrstuvwxyz') {
	baseSequence = baseSequence.substring(0, 26)

	const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

	const cypher = new Map(
		Array.from([...baseSequence], (char, index) => [char, ALPHABET.charAt(index)])
	)

	function decrypt(encryptedText = '') {
		return [...encryptedText]
			.map(char => cypher.get(char) ?? char)
			.join('')
	}

	return { decrypt }
}

function main() {
	const cypherInstance = Cypher(sequence)
	const decryptedText = cypherInstance.decrypt(encryptedText)

	console.log(`${decryptedText}`)
}

main()