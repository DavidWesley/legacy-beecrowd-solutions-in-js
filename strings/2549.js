const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.trim())

function main() {
	const output = []

	while (input.length > 0) {
		if (input[0] === "") break // EOF Condition

		const [N, A] = input.shift().split(" ", 2)
		const formattedNames = input
			.splice(0, Number.parseInt(N, 10))
			.map(name => name
				.replace(/(\b\w)\w+/g, "$1")
				.replace(/\s+/g, "")
				.concat(A)
			)

		const uniqueNames = new Set(formattedNames)
		const unstandardNamesQuantity = formattedNames.length - uniqueNames.size

		output.push(unstandardNamesQuantity)
	}

	console.log(output.join("\n"))
}

main()