const { readFileSync } = require("fs")
const [N1, N2, N3, N4, N5, N6] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 6)
	.map(Number)

const isPositive = (num) => Number(num) >= 0
const positiveNumbersCounter = (...nums) => nums.filter(isPositive).length

console.log("%d valores positivos", positiveNumbersCounter(N1, N2, N3, N4, N5, N6))
