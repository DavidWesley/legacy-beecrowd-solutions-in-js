const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

function alignFromRight(texts = [""]) {
	const biggestTextLength = Math.max.apply(null, texts.map(text => text.length))
	return texts.map(text => text.padStart(biggestTextLength, " ")).join("\n")
}

/** @param {string} spacedText*/
const deepTrimSpaces = (spacedText) => spacedText.replaceAll(/\s+/, " ").trim()

function main() {
	const responses = []

	const quantitiesTexts = input.match(/(?<number>\d+)/g)
	const textsList = input.match(/(?<texts>[a-zA-Z ]+$)/gm)

	for (const quantity of quantitiesTexts) {
		if (quantity === "0") break

		const currentSelectedWords = textsList.splice(0, +quantity)
		const currentTrimmedWords = currentSelectedWords.map(deepTrimSpaces)
		const currentAlignedWords = alignFromRight(currentTrimmedWords)

		responses.push(currentAlignedWords)
	}

	console.log(responses.join("\n\n"))
}

main()