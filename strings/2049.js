const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let index = 0, instanceIndex = 1; index < input.length; index += 2, instanceIndex++) {
		const key = input[index]
		const sequence = input[index + 1]

		if (key == "0" || sequence == "") break // EOFile Condition
		const contain = new RegExp(key).test(sequence) ? "verdadeira" : "falsa"

		responses.push(`Instancia ${instanceIndex}\n${contain}`)
	}

	console.log(responses.join("\n\n"))
}

main()