const { readFileSync } = require("node:fs")
const [[A, B, C], [X, Y, Z]] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(line => line.split(" ", 3).map(value => Number.parseInt(value, 10)))

console.log(
	Math.trunc(X / A) *
	Math.trunc(Y / B) *
	Math.trunc(Z / C)
)
