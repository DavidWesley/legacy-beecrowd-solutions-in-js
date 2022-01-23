const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const [N1, N2, N3, N4, N5, N6] = input.map(Number)

const isPositive = (num) => Number(num) >= 0
const positiveNumbersCounter = (...nums) => nums.filter(isPositive).length

function main() {
	const positiveNumbersQuantity = positiveNumbersCounter(N1, N2, N3, N4, N5, N6)
	console.log("%d valores positivos", positiveNumbersQuantity)
}

main()