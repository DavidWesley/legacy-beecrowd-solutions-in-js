const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const [N1, N2, N3, N4, N5, N6] = input.map(Number)
const numbersLists = [N1, N2, N3, N4, N5, N6]

const isPositive = (num = 0) => Number(num) > 0
const sumArray = ([...nums]) => nums.reduce((curr, prev) => prev + curr, 0)
const positiveNumbers = ([...nums]) => nums.filter(isPositive)

function main() {
	const positiveNumsArray = positiveNumbers(numbersLists)
	const positiveNumsQuantity = positiveNumsArray.length
	const positiveNumbersSum = sumArray(positiveNumsArray)

	const responses = [
		`${positiveNumsQuantity} valores positivos`,
		`${(positiveNumbersSum / positiveNumsQuantity).toFixed(1)}`
	]

	console.log(responses.join('\n'))
}

main()