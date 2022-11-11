const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

class Morse {
	#dot; #space
	#dash; #sepChars; #sepWords
	#dict
	#MorseToCharMap; #CharToMorseMap

	/** @typedef  { { space: string, unit: string } } symbolType */
	/** @param { { symbol : symbolType } } code */
	constructor(code) {
		this.#dot = code.symbol.unit
		this.#space = code.symbol.space

		this.#dash = this.#dot.repeat(3)
		this.#sepChars = this.#space.repeat(3)
		this.#sepWords = this.#space.repeat(7)

		this.#dict = this.#dictionary(this.#dot, this.#space)

		this.#MorseToCharMap = new Map(this.#dict.map(([char, morseCode]) => [morseCode, char]))
		this.#CharToMorseMap = new Map(this.#dict.map(([char, morseCode]) => [char, morseCode]))

		this.#CharToMorseMap.set(" ", this.#space) // Need solving some bug
	}

	/**
	 * @param {string} unit
	 * @param {string} space
	 */
	#dictionary(unit, space = this.#space) {
		const dot = unit
		const dash = unit.repeat(3)

		const list = [
			["", this.#sepChars],
			[" ", this.#sepWords],

			["a", [dot, dash].join(space)],
			["b", [dash, dot, dot, dot].join(space)],
			["c", [dash, dot, dash, dot].join(space)],
			["d", [dash, dot, dot].join(space)],
			["e", [dot].join(space)],
			["f", [dot, dot, dash, dot].join(space)],
			["g", [dash, dash, dot].join(space)],
			["h", [dot, dot, dot, dot].join(space)],
			["i", [dot, dot].join(space)],
			["j", [dot, dash, dash, dash].join(space)],
			["k", [dash, dot, dash].join(space)],
			["l", [dot, dash, dot, dot].join(space)],
			["m", [dash, dash].join(space)],
			["n", [dash, dot].join(space)],
			["o", [dash, dash, dash].join(space)],
			["p", [dot, dash, dash, dot].join(space)],
			["q", [dash, dash, dot, dash].join(space)],
			["r", [dot, dash, dot].join(space)],
			["s", [dot, dot, dot].join(space)],
			["t", [dash].join(space)],
			["u", [dot, dot, dash].join(space)],
			["v", [dot, dot, dot, dash].join(space)],
			["w", [dot, dash, dash].join(space)],
			["x", [dash, dot, dot, dash].join(space)],
			["y", [dash, dot, dash, dash].join(space)],
			["z", [dash, dash, dot, dot].join(space)],

			["1", [dot, dash, dash, dash, dash].join(space)],
			["2", [dot, dot, dash, dash, dash].join(space)],
			["3", [dot, dot, dot, dash, dash].join(space)],
			["4", [dot, dot, dot, dot, dash].join(space)],
			["5", [dot, dot, dot, dot, dot].join(space)],
			["6", [dash, dot, dot, dot, dot].join(space)],
			["7", [dash, dash, dot, dot, dot].join(space)],
			["8", [dash, dash, dash, dot, dot].join(space)],
			["9", [dash, dash, dash, dash, dot].join(space)],
			["0", [dash, dash, dash, dash, dash].join(space)],
		]

		return list
	}

	/** @param {string} msg */
	morseToText(msg) {
		return msg.split(this.#sepWords).map(function (morseWord) {
			return morseWord.split(this.#sepChars).map(function (code) {
				return this.#MorseToCharMap.get(code) ?? code
			}, this).join("")
		}, this).join(" ")
	}

	/** @param {string} msg */
	textToMorse(msg) {
		return [...msg.toLowerCase()].map(function (char) {
			return this.#CharToMorseMap.get(char) ?? char
		}, this).join(this.#sepChars)
	}
}

function main() {
	const morse = new Morse({ symbol: { space: ".", unit: "=" } })
	const output = Array.from(
		{ length: Number.parseInt(numLines, 10) },
		(_, index) => morse.morseToText(input[index])
	)

	console.log(output.join("\n"))
}

main()
