const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2).map(value => Number.parseInt(value, 10)))

function main() {
	const output = []

	for (let index = 0; index < input.length; index++) {
		if (input[index].includes(NaN)) break // EOFile Condition
		const [FPs, FHs] = input[index].map(BigInt)
		// F + V = A + 2
		const F = FPs + FHs
		const A = ((5n * FPs) + (6n * FHs)) / 2n
		const V = A + 2n - F

		output.push(
			`Molecula #${index + 1}.:.`,
			`Possui ${V} atomos e ${A} ligacoes`,
			""
		)
	}

	console.log(output.join("\n"))
}

main()