const { readFileSync } = require("node:fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map(value => Number.parseInt(value, 10))


function main() {
	const output = []

	while (input.length > 0) {
		const N = input.shift()
		const Q = input.shift()
		const grades = input.splice(0, N).sort((a, b) => b - a)
		const queries = input.splice(0, Q).map((query) => grades[query - 1])

		Reflect.apply(Array.prototype.push, output, queries)
	}

	console.log(output.join("\n"))
}

main()