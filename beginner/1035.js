const { readFileSync } = require("node:fs")
const [A, B, C, D] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 4)
	.map((value) => Number.parseInt(value, 10))

function isAcceptable(a, b, c, d) {
	return (b > c) && (d > a) && (c + d > a + b) && (c > 0) && (d > 0) && (a % 2 == 0)
		? true
		: false
}

console.log(isAcceptable(A, B, C, D) ? "Valores aceitos" : "Valores nao aceitos")
