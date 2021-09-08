const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function ChristmasCypher() {
	const cypherTable = new Map([
		["@", "a"],
		["&", "e"],
		["!", "i"],
		["*", "o"],
		["#", "u"],
	])

	return function decryptChristimasText(text = "") {
		[...cypherTable.keys()].forEach((symbol) => {
			text = text.replaceAll(symbol, cypherTable.get(symbol))
		})

		return text
	}
}

function main() {
	const stopAtIndex = input.includes("") ? input.indexOf("") : input.length
	const encryptedChristmasTexts = input.slice(0, stopAtIndex)

	const christimasTextDecrypter = ChristmasCypher()
	const decryptedTexts = encryptedChristmasTexts.map(christimasTextDecrypter)

	console.log(`${decryptedTexts.join("\n")}`)
}

main()
