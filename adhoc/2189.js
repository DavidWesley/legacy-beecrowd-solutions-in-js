const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (let i = 0, testcase = 1; i < input.length; i += 2, testcase += 1) {
		if (input[i][0] === 0)
			break

		const position = input[i + 1].find((value, index) => value === index + 1)

		responses.push(
			`Teste ${testcase}`,
			position,
			""
		)
	}

	console.log(responses.join("\n"))
}

main()