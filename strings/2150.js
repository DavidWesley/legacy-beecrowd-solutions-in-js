const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const countOccurrencesOfCharsIntoText = (msg, chars = "") => msg.match(new RegExp(`[${chars}]`, "gi")).length

function main() {
	const responses = []

	for (let i = 0; i < input.length; i += 2) {
		const vowels = input[i]
		const message = input[i + 1]

		if (vowels == "" || message == "") break

		responses.push(countOccurrencesOfCharsIntoText(message, vowels))
	}

	console.log(responses.join("\n"))
}

main()