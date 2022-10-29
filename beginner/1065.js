const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 5)
	.map((value) => Number.parseInt(value, 10))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const evenNumbersCounter = (/** @type {number[]} */ ...nums) => nums.filter(isEven).length

console.log("%d valores pares", evenNumbersCounter(...input))
