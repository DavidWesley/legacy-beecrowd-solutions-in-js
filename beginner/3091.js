const { readFileSync } = require("fs")
const [dividend, divisor] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.slice(0, 2)
	.map(num => Number.parseInt(num, 10))

const rest = (num, divisor) => num % divisor

function main() {
	console.log(`${rest(dividend, divisor)}`)
}

main()