const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let index = 0, caseIndex = 1; index < input.length; index += 2, caseIndex += 1) {
		if (input[index] == "") break // EOF

		const susbtr = input[index]
		const text = input[index + 1]

		const subseqIndexes = Array.from(
			text.matchAll(new RegExp(susbtr, "g")),
			({ index }) => index
		)

		responses.push(`Caso #${caseIndex}:`)

		if (subseqIndexes.length > 0) {
			responses.push(
				`Qtd.Subsequencias: ${subseqIndexes.length}`,
				`Pos: ${1 + subseqIndexes.at(-1)}`,
				""
			)
		} else
			responses.push("Nao existe subsequencia\n")
	}

	console.log(responses.join("\n"))
}

main()