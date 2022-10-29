const { readFileSync } = require("node:fs")
const [A, B, C, D] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 4)
	.map(value => Number.parseInt(value, 10))

function main() {
	const difference = A * B - C * D
	console.log("DIFERENCA = %d", difference)
}

main()
