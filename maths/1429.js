const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

function Factorial() {
	const factorialValues = new Map([[0, 1n], [1, 1n]])

	function fact(/** @type {number}*/num) {
		let returnedValue = 1
		for (let f = 2; f <= num; f++) returnedValue *= f
		return BigInt(returnedValue)
	}

	function updateFactorialList(/** @type {number}*/num) {
		if (!factorialValues.has(num)) factorialValues.set(num, fact(num))
		return factorialValues
	}

	const factorial = (/** @type {number}*/num) => updateFactorialList(num).get(num)

	return { factorial }
}

/** @param {number | string} acm*/
/** @param {ReturnType<Factorial>} factListInstance*/

function ACMToDec(acm, factListInstance) {
	return [...`${acm}`].reverse().reduce((sum, decimal, index) => sum + (factListInstance.factorial(index + 1) * BigInt(decimal)), 0n)
}

function main() {
	const stopAtIndex = input.indexOf("0")
	const factorialListInstance = Factorial()

	const responses = input
		.slice(0, stopAtIndex)
		.map(acm => ACMToDec(acm, factorialListInstance))

	console.log(responses.join("\n"))
}

main()