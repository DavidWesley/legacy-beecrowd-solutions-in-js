const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2).map(BigInt))

function main() {
	const output = []

	for (let index = 0; index < input.length; index++) {
		const [FP, FH] = input[index]

		if (FP === 0n || FH === 0n) break // EOF
		// F + V = A + 2
		const F = FP + FH
		const A = (5n * FP + 6n * FH) / 2n
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
