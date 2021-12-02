const { readFileSync } = require("fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.slice(0, 2)
	.map(value => Number.parseInt(value, 10))

const sums = (/** @type {number[]} */...values) => values.reduce((sum, value) => value + sum, 0)

function main() {
	const sum = sums(A, B)
	console.log(`SOMA = ${sum}`)
}

main()