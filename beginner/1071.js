const { readFileSync } = require("fs")
const [firstLimit, secondLimit] = readFileSync("/dev/stdin", "utf8")
	.split('\n')
	.slice(0, 2)
	.map(limitt => Number.parseInt(limitt, 10))

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function getOddsNums(lowerLim, upperLim = lowerLim) {
	const minLimVal = Math.min(lowerLim, upperLim)
	const maxLimVal = Math.max(lowerLim, upperLim)

	return Array.from(
		{ length: Math.abs(maxLimVal - minLimVal) + 1 },
		(_, index) => minLimVal + index
	).filter(isOdd)
}

function main() {
	const oddNumbers = getOddsNums(firstLimit, secondLimit)
	const oddSum = oddNumbers.reduce((prev, curr) => prev + curr, 0)

	console.log(oddSum)
}

main()