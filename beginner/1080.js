const { readFileSync } = require("fs")
const listNumbers = readFileSync("/dev/stdin", "utf8")
	.split('\n')
	.slice(0, 100)
	.map(num => Number.parseInt(num, 10))

function main() {
	const biggerNum = Math.max(...listNumbers)
	const posOfBigNum = listNumbers.indexOf(biggerNum) + 1

	console.log([biggerNum, posOfBigNum].join('\n'))
}

main()