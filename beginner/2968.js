const { readFileSync } = require("node:fs")
const [V, N] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map((value) => Number.parseInt(value, 10))

function main() {
	const output = Array.from(
		{ length: 9 },
		(_, i) => Math.ceil((V * N) / 10 * (i + 1))
	)

	console.log(output.join(" "))
}

main()
