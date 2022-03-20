const { readFileSync } = require("fs")
const [key, numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase()

function VigenèreCipher(private_key) {
	const PRIVATE_KEY = String(private_key ?? "")

	function createTable() {
		const cypherTable = {}

		for (let row = 0; row < PRIVATE_KEY.length; row++) {
			cypherTable[PRIVATE_KEY.charAt(row)] = {}

			for (let col = 0; col < PRIVATE_KEY.length; col++)
				cypherTable[PRIVATE_KEY.charAt(row)][PRIVATE_KEY.charAt(col)] = PRIVATE_KEY.charAt((row + col) % PRIVATE_KEY.length)
		}

		return cypherTable
	}

	const CIPHER = createTable()

	function encryptText(key, text) {
		let index = 0

		const encrypted = text.replace(
			/\b((?![aeiou])[a-z][a-z]+)\b/gi,
			(match) => {
				return Array
					.from(match, (char) => CIPHER[key.charAt(index++ % key.length).toUpperCase()][char.toUpperCase()] || char)
					.join("")
					.toLowerCase()
			})

		return encrypted
	}

	return {
		cipher: CIPHER,
		encrypt: encryptText
	}
}

const { encrypt } = VigenèreCipher(ALPHABET)

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map(line => encrypt(key, line))

	console.log(responses.join("\n"))
}

main()