const { readFileSync } = require("fs")
const cases = readFileSync("./dev/stdin", "utf8").split("\n")

function returnInittialLettersFromTextSequence(textSequence = [""]) {
	return textSequence.map((textCase) => {
		return textCase
			.toLowerCase()
			.split(" ")
			.map((inittialLetter) => inittialLetter[0])
	})
}

function countAlliteration(textSequence = [""]) {
	const counterArray = []
	const inittialLetters = returnInittialLettersFromTextSequence(textSequence)

	for (const letters of inittialLetters) {
		let counter = 0

		for (let l = 0; l < letters.length - 1; l++) {
			const curr = letters[l]
			const next = letters[l + 1]
			if (next === curr) {
				const prev = letters[l - 1]
				if (!(prev === curr)) counter++
			}
		}

		counterArray.push(counter)
	}

	return counterArray
}

function main() {
	const responses = countAlliteration(cases) //=
	console.log(responses.join("\n"))
}

main()
