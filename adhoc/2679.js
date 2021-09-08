const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

function main() {
	const num = Number.parseInt(input.shift(), 10)
	const response = isEven(num) ? num + 2 : num + 1

	console.log(`${response}`)
}

main()