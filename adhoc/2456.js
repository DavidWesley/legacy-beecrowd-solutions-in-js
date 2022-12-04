const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split(" ", 5)
	.map((value) => Number.parseInt(value, 10))

/**
 * @param {string | any[]} arr
 * @param {number} position
 */
const at = (arr, position) => arr[(arr.length + position) % arr.length]

/** @param {number[]} arr */
function isCrescent(arr) {
	for (let index = 0; index < arr.length - 1; index++)
		if (at(arr, index) < at(arr, index + 1) === false)
			return false

	return true
}

/** @param {number[]} arr */
function isDecrescent(arr) {
	for (let index = 0; index < arr.length - 1; index++)
		if (at(arr, index) > at(arr, index + 1) === false)
			return false

	return true
}

function main() {
	if (isCrescent(input)) console.log("C")
	else if (isDecrescent(input)) console.log("D")
	else console.log("N")
}

main()
