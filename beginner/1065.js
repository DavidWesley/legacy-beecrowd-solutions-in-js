const { readFileSync } = require("fs")

const nums = readFileSync("/dev/stdin", "utf8")
	.split('\n')
	.slice(0, 5)
	.map((value) => Number.parseInt(value, 10))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const evenNumbersCounter = (/** @type {number[]} */ ...nums) => nums.filter(isEven).length

function main() {
	const evenNumbersQuantity = evenNumbersCounter(...nums)
	console.log("%d valores pares", evenNumbersCounter)
}

main()