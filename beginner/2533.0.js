const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2).map(value => Number.parseInt(value, 10)))

function main() {
	const output = []

	while (input.length > 0) {
		const [M] = input.shift()
		if (Number.isNaN(M)) break // EOF Condition
		const disciplines = input.splice(0, M)
		const IRA =
			disciplines.reduce((total, [N, C]) => total + (N * C), 0)
			/ disciplines.reduce((total, [, C]) => total + C, 0)
			/ 100

		output.push(IRA.toFixed(4))
	}

	console.log(output.join("\n"))
}

main()
