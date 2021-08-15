const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

/** @param {number} size */
const createSquareModel = (size) => ({ lengths: { cols: size, rows: size } })

function createMatrixFromModel(model = { lengths: { rows: 0, cols: 0 } }, values = [], defaultReplecmentValue = "0") {
	const { rows: rowsLenght, cols: colsLength } = model.lengths

	const defaultRows = () => new Array(colsLength).fill(defaultReplecmentValue)

	return Array.from({ length: rowsLenght }, () => {
		return defaultRows().map((defaultValue) => values?.shift() ?? defaultValue)
	})
}

function main() {
	const responses = []
	const sizes = input.map(size => Number.parseInt(size))

	sizes.forEach(size => {
		const model = createSquareModel(size)
		const matrix = createMatrixFromModel(model, [], "3")

		for (let i = 0, u = size - 1; i < size; i++, u--) {
			matrix[i][i] = '1'
			matrix[i][u] = '2'

			responses.push(matrix[i].join(''))
		}
	})

	console.log(responses.join('\n'))
}

main()