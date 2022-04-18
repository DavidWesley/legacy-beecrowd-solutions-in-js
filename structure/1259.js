const { readFileSync } = require("fs")
const [numTestCases, ...numbersList] = readFileSync("/dev/stdin", "utf8").split("\n")

const isOdd = (/** @type {number} */ num) => num % 2 === 1
// const isEven = (num) => num % 2 === 0 // Not used

/**
 * @param {Array<string | number>} numbersLists
 */

function sortenerNumbers(numbersLists = [], size = numbersList.length) {
	const oddNumbers = []
	const evenNumbers = []

	for (let index = 0; index < size; index++) {
		const num = Number.parseInt(numbersLists.at(index), 10)
		if (isOdd(num)) oddNumbers.push(num)
		else evenNumbers.push(num)
	}

	oddNumbers.sort((a, b) => b - a) // Descending order
	evenNumbers.sort((a, b) => a - b) // Ascending order

	return [...evenNumbers, ...oddNumbers].join("\n")
}

function main() {
	const sortedNumberList = sortenerNumbers(numbersList, Number.parseInt(numTestCases, 10))
	console.log(sortedNumberList)
}

main()
