const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

class Morse {
	/**
	 * @param {string} unit
	 * @param {string} space
	 */
	static #dictionary(unit, space) {
		const _dot = unit
		const _dash = unit.repeat(3)

		const _sepChars = space.repeat(3)
		const _sepWords = space.repeat(7)

		const list = [
			["", _sepChars],
			[" ", _sepWords],

			["a", [_dot, _dash].join(space)],
			["b", [_dash, _dot, _dot, _dot].join(space)],
			["c", [_dash, _dot, _dash, _dot].join(space)],
			["d", [_dash, _dot, _dot].join(space)],
			["e", [_dot].join(space)],
			["f", [_dot, _dot, _dash, _dot].join(space)],
			["g", [_dash, _dash, _dot].join(space)],
			["h", [_dot, _dot, _dot, _dot].join(space)],
			["i", [_dot, _dot].join(space)],
			["j", [_dot, _dash, _dash, _dash].join(space)],
			["k", [_dash, _dot, _dash].join(space)],
			["l", [_dot, _dash, _dot, _dot].join(space)],
			["m", [_dash, _dash].join(space)],
			["n", [_dash, _dot].join(space)],
			["o", [_dash, _dash, _dash].join(space)],
			["p", [_dot, _dash, _dash, _dot].join(space)],
			["q", [_dash, _dash, _dot, _dash].join(space)],
			["r", [_dot, _dash, _dot].join(space)],
			["s", [_dot, _dot, _dot].join(space)],
			["t", [_dash].join(space)],
			["u", [_dot, _dot, _dash].join(space)],
			["v", [_dot, _dot, _dot, _dash].join(space)],
			["w", [_dot, _dash, _dash].join(space)],
			["x", [_dash, _dot, _dot, _dash].join(space)],
			["y", [_dash, _dot, _dash, _dash].join(space)],
			["z", [_dash, _dash, _dot, _dot].join(space)],

			["1", [_dot, _dash, _dash, _dash, _dash].join(space)],
			["2", [_dot, _dot, _dash, _dash, _dash].join(space)],
			["3", [_dot, _dot, _dot, _dash, _dash].join(space)],
			["4", [_dot, _dot, _dot, _dot, _dash].join(space)],
			["5", [_dot, _dot, _dot, _dot, _dot].join(space)],
			["6", [_dash, _dot, _dot, _dot, _dot].join(space)],
			["7", [_dash, _dash, _dot, _dot, _dot].join(space)],
			["8", [_dash, _dash, _dash, _dot, _dot].join(space)],
			["9", [_dash, _dash, _dash, _dash, _dot].join(space)],
			["0", [_dash, _dash, _dash, _dash, _dash].join(space)],
		]

		return list
	}

	/** @param {string} msg */
	static morseToText(msg, code = { symbol: { unit: "=", space: "." } }) {
		const { unit, space } = code.symbol
		const MorseToCharMap = new Map(Morse.#dictionary(unit, space).map(([char, morseCode]) => [morseCode, char]))

		const _sepWords = space.repeat(7)
		const _sepChars = space.repeat(3)

		return msg.split(_sepWords).map((morseWord) => {
			return morseWord.split(_sepChars).map(code => MorseToCharMap.get(code) ?? code).join("")
		}).join(" ")
	}

	/** @param {string} msg */
	static textToMorse(msg, code = { symbol: { unit: "=", space: "." } }) {
		const { unit, space } = code.symbol
		const CharToMorseMap = new Map(Morse.#dictionary(unit, space).map(([char, morseCode]) => [char, morseCode]))

		CharToMorseMap.set(" ", space) // Need solving some bug
		const _sepChars = space.repeat(3)

		return [...msg.toLowerCase()].map(char => CharToMorseMap.get(char) ?? char).join(_sepChars)
	}
}

function main() {
	const { morseToText } = Morse
	const output = Array.from(
		{ length: Number.parseInt(numLines, 10) },
		(_, index) => morseToText(input[index])
	)

	console.log(output.join("\n"))
}

main()

/*

Neste problema, um ponto é denotado por "="
um traço por "===".
Símbolos são separados por ".",
letras são separadas por "..."
e palavras são separadas por ".......".
Sendo assim, SOS é codificado como =.=.=...===.===.===...=.=.=

*/
