const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

class RA {
	static #VALID_LENGTH = 20
	static validate(data = "") {
		const [match = "", pass] = data.match(/^RA0{0,17}([1-9]\d{0,17}$)/s) || []
		return match.length === RA.#VALID_LENGTH ? [true, pass] : [false, null]
	}
}

function main() {
	const responses = []

	for (const [isValid, pass] of lines.slice(0, +numCases).map(RA.validate))
		responses.push(isValid ? pass : "INVALID DATA")

	console.log(responses.join("\n"))
}

main()