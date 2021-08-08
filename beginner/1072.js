const { readFileSync } = require("fs")
const input = readFileSync("../dev/stdin", "utf8").split('\n')

const numTestCases = parseInt(input.shift())

function getLimits(settedLimits = [0, 0]) {
	settedLimits = [Math.min(...settedLimits), Math.max(...settedLimits)]
	return settedLimits
}

/**
 * @param {number} value
 * @param {number[]} range
 */

function whitinRange(value, range) {
	const settedLimits = getLimits(range)
	return (value >= settedLimits[0] && value <= settedLimits[1])
}

function main() {
	const responses = []

	const limits = [10, 20]
	const numbers = input.map(num => parseInt(num))

	const [inRange, outRange] = numbers.slice(0, numTestCases).reduce((filter, num) => {
		whitinRange(num, limits) ? filter[0].push(num) : filter[1].push(num)
		return filter
	}, [[], []])

	responses.push(
		`${inRange.length} in`,
		`${outRange.length} out`
	)

	console.log(responses.join('\n'))
}

main()