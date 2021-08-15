const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')
const [firstLimit, secondLimit] = input.map(limitt => Number.parseInt(limitt))

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

const oddsNumbersInRange = (lowerLimit = 0, upperLimit = lowerLimit) => {
	const oddNums = []
	const minLimVal = Math.min(lowerLimit, upperLimit) + 1
	const maxLimVal = Math.max(lowerLimit, upperLimit)

	for (let currentOddNum = isOdd(minLimVal) ? minLimVal : minLimVal + 1; currentOddNum < maxLimVal; currentOddNum += 2)
		oddNums.push(currentOddNum)

	return oddNums
}

function main() {
	const oddNumbers = oddsNumbersInRange(firstLimit, secondLimit)
	const sumOfOddNumbers = oddNumbers.reduce((prev, curr) => prev + curr, 0)

	console.log(sumOfOddNumbers)
}

main()