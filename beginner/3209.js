const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 1 + 20 * 11)
	.map(value => Number.parseInt(value, 10))

function main() {
	const output = []

	const N = input.shift()

	for (let i = 0; i < N; i++) {
		const K = input.shift()
		const avaliablePlugsQuantity = input
			.splice(0, K)
			.reduce((total, plug) => total + plug, 1 - K)

		output.push(avaliablePlugsQuantity)
	}

	console.log(output.join("\n"))
}

main()
