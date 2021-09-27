const { readFileSync } = require("fs")
const textList = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const outputs = []

	for (const text of textList) {
		if (text === '') break // EOFile Condition Verification
		const formmatedText = formatText(text)

		outputs.push(formmatedText)
	}

	console.log(`${outputs.join('\n')}`)
}

main()


function formatText(text) {
	let finalText = ""

	for (let index = 0; index < text.length; index++) {
		let char = text[index]

		if (char === "[") {
			if (index + 1 >= text.length) break
			char = text[++index]

			const [wordToPutOnHome, newIndex] = insertTextFrom(index, text)

			index = newIndex
			finalText = wordToPutOnHome.concat(finalText)
		}

		else if (char === "]") {
			if (index + 1 >= text.length) break
			char = text[++index]

			const [wordToPutOnEnd, newIndex] = insertTextFrom(index, text)

			index = newIndex
			finalText = finalText.concat(wordToPutOnEnd)
		}

		else {
			finalText += char
		}
	}

	return finalText
}

function insertTextFrom(index, text = '') {
	let word = ""
	let char = text.charAt(index)

	while (index + 1 <= text.length) {
		if (char === "[" || char === "]") {
			index--
			break
		}

		word += char
		char = text[++index]
	}

	return [word, index]
}