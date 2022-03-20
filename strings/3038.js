const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

class ChristmasCypher {
	static #cypherTable = new Map([
		["@", "a"],
		["&", "e"],
		["!", "i"],
		["*", "o"],
		["#", "u"],
	])

	static decryptChristimasText(text = "") {
		[...ChristmasCypher.#cypherTable.keys()].forEach((symbol) => {
			text = text.replaceAll(symbol, ChristmasCypher.#cypherTable.get(symbol) ?? symbol)
		})

		return text
	}
}

function main() {
	const encryptedChristmasTexts = []

	for (const text of input)
		if (text === "") break
		else encryptedChristmasTexts.push(text)

	const { decryptChristimasText } = ChristmasCypher
	const decryptedTexts = encryptedChristmasTexts.map(decryptChristimasText)

	console.log(decryptedTexts.join("\n"))
}

main()