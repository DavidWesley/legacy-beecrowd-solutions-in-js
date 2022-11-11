const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

class RNAA {
	static #BASES = ["BS", "SB", "FC", "CF"]
	static #BASE_REGEX = RNAA.#BASES.map((base) => new RegExp(base, "g"))

	static countConnections(RNAACode = "") {
		let counter = 0

		while (this.#BASE_REGEX.some((reg) => reg.test(RNAACode))) {
			for (const regex of this.#BASE_REGEX) {
				RNAACode = RNAACode.replace(regex, () => {
					counter++
					return ""
				})
			}
		}

		return counter
	}
}

function main() {
	const output = new Array()

	for (const RNA of input)
		if (RNA == "") break
		else output.push(RNAA.countConnections(RNA))

	console.log(output.join("\n"))
}

main()
