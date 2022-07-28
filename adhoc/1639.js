const { readFileSync } = require("node:fs")
const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))

/**
 * @param {number} A0
 * @param {number} N
 */
function simpleRandomNumbersGenerator(A0, N) {
	const A1 = Math.pow(A0, 2).toString(10).padStart(2 * N, "0").substr(2, 4)
	return Number.parseInt(A1, 10)
}

function main() {
	const N = 4
	const output = []

	for (const line of lines) {
		if (line === 0) break

		let A = line
		let counter = 0
		const list = new Map()

		while (list.has(A) === false) {
			list.set(A)
			counter += 1
			A = simpleRandomNumbersGenerator(A, N)
		}

		output.push(counter)
	}

	console.log(output.join("\n"))
}

main()