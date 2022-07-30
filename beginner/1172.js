const { readFileSync } = require("fs")
const nums = readFileSync("/dev/stdin", "utf8").split("\n", 10).map(Number.parseFloat)

const isNegative = (num = 0) => Number(num) < 0

/**
 * @param {any} newValue
 * @param {Function} condition
 * @param {Array.<any>} targetArray
 */

function replaceValuesFromArrayTo(newValue, condition, targetArray) {
	return targetArray.map((value) => {
		if (condition(value)) return newValue
		else return value
	})
}

function main() {
	const condition = (target) => isNegative(target) || target === 0
	const responses = replaceValuesFromArrayTo(1, condition, nums).map((_, index, arr) => `X[${index}] = ${arr[index]}`)

	console.log(responses.join("\n"))
}

main()