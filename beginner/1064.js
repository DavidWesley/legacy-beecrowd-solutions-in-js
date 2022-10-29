const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 6)
	.map(Number)

const isPositive = (num = 0) => Number(num) > 0
const positiveNumbers = ([...nums]) => nums.filter(isPositive)

function main() {
	const positiveNumsArray = positiveNumbers(input)
	const positiveNumsQuantity = positiveNumsArray.length
	const positiveNumbersSum = positiveNumsArray.reduce((sum, val) => sum + val, 0)

	const output = [
		`${positiveNumsQuantity} valores positivos`,
		`${(positiveNumbersSum / positiveNumsQuantity).toFixed(1)}`
	]

	console.log(output.join("\n"))
}

main()
