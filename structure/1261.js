const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const output = []

	const [M, N] = input
		.shift()
		.split(" ", 2)
		.map(value => Number.parseInt(value, 10))

	const hayPointProfessionsDictionary = new Map()

	for (let i = 0; i < M; i++) {
		const [profession, value] = input
			.shift()
			.split(" ", 2)

		hayPointProfessionsDictionary.set(profession, Number.parseInt(value, 10))
	}

	for (let j = 0; j < N; j++) {
		let amount = 0

		for (let text = input.shift(); text !== "."; text = input.shift()) {
			for (const word of text.split(" "))
				if (hayPointProfessionsDictionary.has(word))
					amount += hayPointProfessionsDictionary.get(word)
		}

		output.push(amount)
	}

	console.log(output.join("\n"))
}

main()
