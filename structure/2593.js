const { readFileSync } = require("node:fs")
const [text, qWords, jWords] = readFileSync("/dev/stdin", "utf8").split("\n", 3)

/**
 * @param {string} word
 * @param {string} text
 */
function findWordPositionsFromText(word, text) {
	const regexGeneratedFromWord = RegExp(`\\b${word}\\b`, "dg")
	const matchedIndexes = [...text.matchAll(regexGeneratedFromWord)]
	return matchedIndexes.length ? matchedIndexes.map(match => match.index) : [-1]
}

function main() {
	const output = jWords
		.split(" ", Number.parseInt(qWords, 10))
		.map(word => findWordPositionsFromText(word, text).join(" "))

	console.log(output.join("\n"))
}

main()
