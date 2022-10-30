const { readFileSync } = require("node:fs")
const [N] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

console.log(isEven(N) ? N + 2 : N + 1)
