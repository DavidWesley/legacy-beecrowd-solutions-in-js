const { readFileSync } = require("fs")
const [C, P, F] = readFileSync("/dev/stdin", "utf8")
	.split(' ')
	.slice(0, 3)
	.map(num => Number.parseInt(num, 10))

console.log(`${(C * F <= P) ? 'N' : 'S'}`)