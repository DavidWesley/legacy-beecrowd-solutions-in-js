const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * Retorna uma lista de strings
 * com todas as diferentes combinações possíveis
 * entre os caracteres de `str` em que cada combinação
 * tem tamanho igual a `str.length`
 * @param {string} str
 * @param {string} prefix
 * @returns {string[]}
*/
function permutations(str, prefix = "") {
	if (str.length <= 1) return [prefix + str]

	return Array
		.from(str)
		.reduce((result, char, index) => {
			const reminder = str.substring(0, index) + str.substring(index + 1)
			return result.concat(permutations(reminder, prefix + char))
		}, [])
}

function main() {
	const output = input
		.splice(0, Number.parseInt(numLines, 10))
		.flatMap((line) => {
			const sortedUniquePermutations = [...new Set(permutations(line)).values()]
				.sort((strA, strB) => {
					if (strA < strB) return -1
					if (strA > strB) return 1
					return 0
				})

			sortedUniquePermutations.push("")
			return sortedUniquePermutations
		})

	console.log(output.join("\n"))
}

main()
