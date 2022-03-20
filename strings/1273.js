const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

function alignFromRight(words = [""]) {
	const biggestWordLength = Math.max.apply(null, words.map(word => word.length))

	return words.map(word => word.padStart(biggestWordLength, " ")).join("\n")
}

function main() {
	const responses = []

	const quantitiesWords = input.match(/(?<number>\d+)/g)
	const wordsList = input.match(/(?<words>[a-zA-Z]+)/g)

	for (const quantity of quantitiesWords) {
		if (quantity === "0") break

		const currentSelectedWords = wordsList.splice(0, +quantity)
		const currentAlignedWords = alignFromRight(currentSelectedWords)

		responses.push(currentAlignedWords)
	}

	console.log(responses.join("\n\n"))
}

main()