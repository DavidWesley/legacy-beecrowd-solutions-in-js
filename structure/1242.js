const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

class RNAA {
	static #BASES = ["BS", "SB", "FC", "CF"]
	static #BASE_REGEX = RNAA.#BASES.map((base) => new RegExp(base, "g"))

	static countconnections(RNAACode = "") {
		let counter = 0

		while (this.#BASE_REGEX.some((reg) => reg.test(RNAACode))) {
			for (const reg of this.#BASE_REGEX) {
				RNAACode = RNAACode.replace(reg, () => {
					counter++
					return ""
				})
			}
		}

		return counter
	}
}

function main() {
	const responses = new Array()

	for (const RNA of input)
		if (RNA == "") break
		else responses.push(RNAA.countconnections(RNA))

	console.log(responses.join("\n"))
}

main()