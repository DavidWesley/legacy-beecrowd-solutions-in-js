const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const responses = []

	for (let index = 0; index < input.length; index += 3) {
		if (input[index] == "") break // EOFile Condition

		const searchableText = input[index]

		const chars = input[index + 2]
			.split(" ", Number.parseInt(input[index + 1]))
			.map((q) => searchableText[+q - 1])
			.join("")

		responses.push(chars)
	}

	console.log(responses.join("\n"))
}

main()