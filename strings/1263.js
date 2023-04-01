const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function returnInitialLettersFromText(text = "") {
	return text
		.replace(/(?<=[A-Z])\w+/gi, "")
		.toLowerCase()
		.split(/\s+/gim)
}

function countAlliterations(text = "") {
	const initialsLetters = returnInitialLettersFromText(text)

	let counter = 0

	for (
		let index = 0, key = "", isAlliteration = false;
		index < initialsLetters.length;
		index += 1
	) {
		const letter = initialsLetters[index]

		if (letter === key) {
			if (isAlliteration === false) counter += 1
			isAlliteration = true
		} else {
			key = letter
			isAlliteration = false
		}
	}

	return counter
}

function main() {
	const output = []

	for (const text of input) {
		if (text === "") break // EOF
		output.push(countAlliterations(text))
	}

	console.log(output.join("\n"))
}

main()
