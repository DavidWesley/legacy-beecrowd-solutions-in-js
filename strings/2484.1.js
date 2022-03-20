const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function textToTriangle(word = "") {
	const lines = []

	for (let i = 0; i < word.length; i++) {
		const line = []
		for (let j = 0; j < word.length - i; j++) line[j] = word[j]

		lines.push(`${" ".repeat(i)}${line.join(" ")}`)
	}

	return lines.join("\n")
}

function main() {
	const responses = []

	for (const word of input) {
		if (word === "") break // EOFile Condition Verification
		responses.push(textToTriangle(word), "")
	}

	console.log(responses.join("\n"))
}

main()