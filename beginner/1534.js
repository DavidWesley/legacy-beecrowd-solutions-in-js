const { readFileSync } = require("node:fs")

const sizes = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => Number.parseInt(line, 10))

/** @param {number} size */
function createSquareModel(size) {
	return ({ lengths: { cols: size, rows: size } })
}

class Matrix {

	/**
 * Create a matrix from a object model
 * @param {ReturnType<typeof createSquareModel>} model
 * @param {Array<any>} values
 * @param {any} defaultReplacementValue
 */
	static createMatrixFromModel(model, values, defaultReplacementValue = null) {
		const { rows, cols } = model.lengths

		return Array.from({ length: rows }, (_, rowIndex) => {
			return Array.from({ length: cols }, (_, colIndex) => {
				return values[(rows * rowIndex) + colIndex] ?? defaultReplacementValue
			})
		})
	}
}

function main() {
	const responses = []

	for (const size of sizes) {
		if (isNaN(size)) break // Possible EOFile Condition
		const model = createSquareModel(size)
		const matrix = Matrix.createMatrixFromModel(model, [], "3")

		for (let i = 0, u = size - 1; i < size; i++, u--) {
			matrix[i][i] = "1"
			matrix[i][u] = "2"

			responses.push(matrix[i].join(""))
		}
	}

	console.log(responses.join("\n"))
}

main()