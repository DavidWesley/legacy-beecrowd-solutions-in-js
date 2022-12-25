const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))

function main() {
	const MAX_SIZE = 1e3

	const output = []
	const buffer = new Uint16Array(MAX_SIZE).map((_, i) => i + 1)

	for (const size of input)
		if (size === 0) break
		else output.push(buffer.subarray(0, size).join(" "))

	console.log(output.join("\n"))
}

main()
