const { readFileSync } = require("fs")
const [init] = readFileSync("../dev/stdin", "utf8").split('\n')

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
	const responses = []

	const initValue = parseInt(init, 10)
	const vector = doubleFillVector(initValue, 10)

	vector.forEach((value, index) => {
		responses.push(
			`N[${index}] = ${value}`
		)
	})

	console.log(`${responses.join('\n')}`)
}

main()