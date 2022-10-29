const { readFileSync } = require("node:fs")
const [X, Y] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map((value) => Number.parseInt(value, 10))

console.log((0 <= X && X <= 432) && (0 <= Y && Y <= 468) ? "dentro" : "fora")
