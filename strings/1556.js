const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * Retorna todas as diferentes combinações entre os caracteres de uma dada string
 * Tendo como único critério a preservação da ordem original dos caracteres da string
 * @param {string} str
 * @returns {string[]}
 */
function allFromLeftCombinations(str = "") {
	const combinations = new Set()

	for (const char of str) {
		const temp = [char]
		for (const c of combinations) temp.push(c.concat(char))
		for (const value of temp) combinations.add(value)
	}

	return [...combinations.values()]
}


function main() {
	const output = []

	for (const line of input) {
		if (line === "") break // EOFile Condition

		Reflect.apply(
			Array.prototype.push,
			output,
			allFromLeftCombinations(line).sort((strA, strB) => strA.localeCompare(strB, "en-US"))
		)

		output.push("")
	}

	console.log(output.join("\n"))
}

main()
