const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const numbersLists = input.slice(0, 5).map(num => Number.parseInt(num, 10))

const isNegative = (num = 0) => Number(num) < 0
const isPositive = (num = 0) => Number(num) > 0
const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

const countNumsByProperties = (listNums = [0], filterFn = () => Boolean()) => listNums.filter(filterFn).length

const oddNumbersCounter = ([...nums]) => countNumsByProperties(nums, isOdd)
const evenNumbersCounter = ([...nums]) => countNumsByProperties(nums, isEven)
const positiveNumbersCounter = ([...nums]) => countNumsByProperties(nums, isPositive)
const negativeNumbersCounter = ([...nums]) => countNumsByProperties(nums, isNegative)

function main() {
	const oddNumbersQuantity = oddNumbersCounter(numbersLists)
	const evenNumbersQuantity = evenNumbersCounter(numbersLists)
	const positiveNumbersQuantity = positiveNumbersCounter(numbersLists)
	const negativeNumbersQuantity = negativeNumbersCounter(numbersLists)

	const responses = [
		`${evenNumbersQuantity} valor(es) par(es)`,
		`${oddNumbersQuantity} valor(es) impar(es)`,
		`${positiveNumbersQuantity} valor(es) positivo(s)`,
		`${negativeNumbersQuantity} valor(es) negativo(s)`
	]

	console.log(responses.join("\n"))
}

main()