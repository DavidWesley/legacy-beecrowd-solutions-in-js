const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)


class BrailleDigits {
	static #DIGITS_BRAILLE_PLANNED = Object.freeze({
		1: "*.....",
		2: "*.*...",
		3: "**....",
		4: "**.*..",
		5: "*..*..",
		6: "***...",
		7: "****..",
		8: "*.**..",
		9: ".**...",
		0: ".***.."
	})

	// Protected Like
	static get digits() {
		return BrailleDigits.#DIGITS_BRAILLE_PLANNED
	}
}


class BrailleDigitEncoder extends BrailleDigits {
	/** @param {string} digits */

	static fromDigits(digits) {
		const plannedSymbols = digits.split("").map((digit) => {
			return (this.digits[digit] ?? "")
				.replace(/([.*]{1,2})([.*]{1,2})([.*]{1,2})/, "$1-$2-$3")
				.split("-")
		})

		const LevelPlaceholder = new Array(digits.length).fill("") // Improving performance creating once

		// Levels
		const L1 = LevelPlaceholder.map((_, i) => plannedSymbols[i][0]).join(" ")
		const L2 = LevelPlaceholder.map((_, i) => plannedSymbols[i][1]).join(" ")
		const L3 = LevelPlaceholder.map((_, i) => plannedSymbols[i][2]).join(" ")

		return [L1, L2, L3].join("\n")
	}
}


class BrailleDigitDecoder extends BrailleDigits {

	/** @param {string[][]} brailles  */

	static toDigits(brailles) {
		const len = brailles[0].length
		const digitsPlainedSymbols = new Array(len).fill("")

		for (let i = 0; i < len; i++) {
			digitsPlainedSymbols[i] += brailles[0][i]
			digitsPlainedSymbols[i] += brailles[1][i]
			digitsPlainedSymbols[i] += brailles[2][i]
		}

		const Bentries = Object.entries(this.digits)

		const decodedText = digitsPlainedSymbols.map((sym) => {
			const [digit] = Bentries.find(([, Bsymbol]) => sym == Bsymbol) ?? [""]
			return digit
		})

		return decodedText
	}
}


function main() {
	const responses = []

	for (let size = input.next(); size.done == false && size.value != "0"; size = input.next()) {
		const code = input.next().value

		if (code == "S") {
			const digits = input.next().value
			responses.push(BrailleDigitEncoder.fromDigits(digits))
		} else if (code == "B") {

			const braille = [
				input.next().value.split(" "),
				input.next().value.split(" "),
				input.next().value.split(" ")
			]

			responses.push(BrailleDigitDecoder.toDigits(braille).join(""))
		}
	}

	console.log(responses.join("\n"))
}

main()