const { readFileSync } = require("fs")

const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (let index = 0; index < lines.length; index++) {
		if (lines[index].some(isNaN)) break // stop at empty line

		const [initialCost, finalCost] = lines[index]

		const difference = finalCost - initialCost
		const percentual = (difference / initialCost) * 100.00

		responses.push(
			`Projeto ${index + 1}:`,
			`Percentual dos juros da aplicacao: ${percentual.toFixed(2)} %`,
			""
		)
	}

	console.log(responses.join("\n"))
}

main()