const { readFileSync } = require("fs")
const cases = readFileSync("/dev/stdin", "utf8").split("\n")

function returnInittialLettersFromText(text = "") {
	return text
		.toLowerCase()
		.split(/\s/gim)
		.filter(Boolean)
		.map((word) => word.charAt(0))
}

function countAlliterations(text = "") {
	const letters = returnInittialLettersFromText(text)

	let key = ""
	let counter = 0
	let isAlliteration = false

	for (const letter of letters) {
		if (letter === key) {
			if (!isAlliteration) counter++
			isAlliteration = true
		} else {
			key = letter
			isAlliteration = false
		}
	}

	return counter
}

function main() {
	const responses = []

	for (const text of cases) {
		if (text === "") break // EOFile Condition Verification
		responses.push(countAlliterations(text))
	}

	console.log(`${responses.join("\n")}`)
}

main()
