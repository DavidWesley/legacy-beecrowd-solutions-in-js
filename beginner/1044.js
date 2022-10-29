const { readFileSync } = require("node:fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

console.log(
	A % B === 0 || B % A === 0
		? "Sao Multiplos"
		: "Nao sao Multiplos"
)
