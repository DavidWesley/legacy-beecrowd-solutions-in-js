const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").shift()

/** @typedef { number | bigint | string } anyNumberType */

const Long = {
	/**
	 * @param { anyNumberType } numA
	 * @param { anyNumberType } numB
	 */
	min: (numA, numB) => {
		numA = BigInt(numA)
		numB = BigInt(numB)
		return numA <= numB ? numA : numB
	}
}

const DEFFAULT_VALID_MAX_VALUE_NUM = Math.pow(2, 31) - 1

/** @param { anyNumberType } originalNumber */

function revertNumParts(originalNumber) {
	return `${originalNumber}`
		.split(".", 2)
		.map(part => part.replace(/^[0]+/, "") || "0")
		.map(part => Long.min(part, DEFFAULT_VALID_MAX_VALUE_NUM))
		.reverse()
		.join(".")
}

console.log(revertNumParts(input))