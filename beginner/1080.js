const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const SIZE = 100
const listNumbers = input.splice(0, SIZE).map(num => Number.parseInt(num))

function main() {
	const biggerNum = Math.max(...listNumbers)
	const posOfBigNum = listNumbers.indexOf(biggerNum) + 1

	console.log([biggerNum, posOfBigNum].join('\n'))
}

main()