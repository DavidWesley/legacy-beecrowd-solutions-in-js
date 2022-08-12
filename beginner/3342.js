const { readFileSync } = require("node:fs")
const [num] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

const whites = Math.ceil(Math.pow(num, 2) / 2)
const blacks = Math.floor(Math.pow(num, 2) / 2)

console.log("%d casas brancas e %d casas pretas", whites, blacks)