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
	const stopAtIndex = input.includes("") ? input.indexOf("") : input.length
	const encryptedChristmasTexts = input.slice(0, stopAtIndex)

	const { decryptChristimasText } = ChristmasCypher
	const decryptedTexts = encryptedChristmasTexts.map(decryptChristimasText)

	console.log(`${decryptedTexts.join("\n")}`)
}

main()
