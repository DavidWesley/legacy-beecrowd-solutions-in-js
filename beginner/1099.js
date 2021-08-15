const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const numTestCases = Number(input.shift())
const cases = input
	.map((pair) => pair.split(" ").map((num) => Number.parseInt(num)))
	.splice(0, numTestCases)

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function orderLimits([firstLimit, secondLimit = firstLimit]) {
	const inferior = Math.min(firstLimit, secondLimit)
	const superior = Math.max(firstLimit, secondLimit)
	return [inferior, superior]
}

function sumOfOddNumberInRangeExclude(minLimit, maxLimit) {
	let sumOddNumbers = 0
	for (let num = minLimit + 1; num < maxLimit; num++)
		if (isOdd(num)) sumOddNumbers += num
	return sumOddNumbers
}

function main() {
	const responses = []

	for (const pair of cases) {
		const ordenedExtremes = orderLimits(pair)
		const sum = sumOfOddNumberInRangeExclude(...ordenedExtremes)
		responses.push(sum)
	}

	console.log(responses.join("\n"))
}

main()
