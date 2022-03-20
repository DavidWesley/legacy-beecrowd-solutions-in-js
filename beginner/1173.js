const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").shift()

/**
 * @param {number} initialValue
 * @param {number} length
*/

function doubleFillVector(initialValue, length) {
	for (var vector = [], index = 0, value = initialValue; index < length; index++)
		vector.push(value += vector[index - 1] || 0)

	return vector
}

function main() {
	const initValue = Number.parseInt(input, 10)
	const responses = doubleFillVector(initValue, 10).map((value, index) => `N[${index}] = ${value}`)

	console.log(responses.join("\n"))
}

main()