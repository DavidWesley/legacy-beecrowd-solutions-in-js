const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 3).map(value => Number.parseInt(value, 10)))


function main() {
	const output = []

	for (const line of input) {
		if (line.every(edge => edge === 0)) break

		output.push(
			Math.trunc(
				Math.cbrt(
					line.reduce((prod, value) => prod * value, 1)
				)
			))
	}

	console.log(output.join("\n"))
}

main()
