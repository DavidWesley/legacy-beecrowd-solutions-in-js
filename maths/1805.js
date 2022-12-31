const { readFileSync } = require("node:fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

const getSum = (a, b) => (Math.abs(a - b) + 1) * (a + b) / 2

console.log(getSum(A, B))
