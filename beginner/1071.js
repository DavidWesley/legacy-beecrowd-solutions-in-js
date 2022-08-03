const { readFileSync } = require("fs")
const [limitA, limitB] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

/** @param {Parameters<NumberConstructor>[0]} num */
const isOdd = (num) => Math.abs(Number(num)) % 2 === 1

function* selectNumsInRange(limitA, limitB, predicate) {
	const min = Math.min(limitA, limitB)
	const max = Math.max(limitA, limitB)
	for (let num = min; num <= max; num++) if (predicate(num)) yield num
}

function main() {
	const oddNumbersInRangeSum = [...selectNumsInRange(limitA, limitB, isOdd)].reduce((sum, num) => sum + num, 0)
	console.log(oddNumbersInRangeSum)
}

main()