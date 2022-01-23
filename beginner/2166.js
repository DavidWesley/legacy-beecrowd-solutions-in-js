const { readFileSync } = require("fs")
const [repeatTimes] = readFileSync("/dev/stdin", "utf8").split(/\d{1, 3}/g)

/**
 * @param {number} repeat
 * @param {number} tax
 * @returns {number}
 */

function sumContinuousFracs(repeat, tax, intPart = 0) {
	return intPart + Array(repeat).fill(tax).reduce((accumulator, currentTax) => Math.pow(accumulator + currentTax, -1), 0)
}

function main() {
	const sqrt2FromContinuosFrac = sumContinuousFracs(+repeatTimes, 2, 1)
	console.log(sqrt2FromContinuosFrac.toFixed(10))
}

main()