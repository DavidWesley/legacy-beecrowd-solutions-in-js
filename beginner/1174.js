const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {number[]} values
 * @param {number} limit
 * @returns {number[][]}
 */

function selectValuesLessThanOrEqualToLimit(values, limit) {
	return values.reduce(
		(final, value, index) => {
			if (value <= limit) final.push([index, value])
			return final
		}, []
	)
}

function main() {
	const responses = []

	const size = 100
	const values = input.slice(0, size).map(Number.parseFloat)
	const selectedValues = selectValuesLessThanOrEqualToLimit(values, 10)

	for (const [index, value] of selectedValues)
		responses.push(
			`A[${index}] = ${value.toFixed(1)}`
		)

	console.log(responses.join("\n"))
}

main()
