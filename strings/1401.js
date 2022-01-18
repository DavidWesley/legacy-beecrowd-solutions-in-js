const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @returns {string[]} */

function getPermutations(string, prefix = "") {
	if (string.length <= 1) return [prefix + string]

	return Array.from(string).reduce((result, char, index) => {
		const reminder = string.slice(0, index) + string.slice(index + 1)
		return result.concat(getPermutations(reminder, prefix + char))
	}, [])
}

function main() {
	const responses = lines.slice(0, +numLines).flatMap((line) => {
		const sorted = [...new Set(getPermutations(line)).values()].sort((strA, strB) => {
			if (strA < strB) return -1
			if (strA > strB) return 1
			return 0
		})

		sorted.push("")

		return sorted
	})

	console.log(responses.join("\n"))
}

main()
