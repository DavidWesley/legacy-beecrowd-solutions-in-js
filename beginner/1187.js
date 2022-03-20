const { readFileSync } = require("fs")
const [CMD, ...values] = readFileSync("/dev/stdin", "utf8").split("\n")


/** @param {number[]} values */
const sumValues = ([...values], initialValue = 0) => values.reduce((acc, cur) => acc + cur, initialValue)

/** @param {number[]} values */
const mediaValues = ([...values]) => sumValues(values) / values.length

/** @param {number} size*/
const createSquareModel = (size) => ({ lengths: { cols: size, rows: size } })

function createMatrixFromModel(model = createSquareModel(0), values = [], defaultReplecmentValue = 0) {
	const { rows: rowsLenght, cols: colsLength } = model.lengths
	const defaultRows = () => new Array(colsLength).fill(defaultReplecmentValue)

	return Array.from({ length: rowsLenght }, () => {
		return defaultRows().map((defaultValue) => values.shift() ?? defaultValue)
	})
}

/** @typedef {'S' | 'M'} operationType */

/**
 * @param {number[][]} matrix
 * @param {operationType} operation
 */

function selectedSupAreaToOperateFromSquareMatrix(matrix, operation) {
	const selectedValues = []
	const limiter = Math.ceil(matrix.length / 2) - 1

	for (let currentRowIndex = 0; currentRowIndex < limiter; currentRowIndex++) {
		const firstColIndex = currentRowIndex + 1
		const lastColIndex = (limiter * 2) - currentRowIndex

		for (let currentColIndex = firstColIndex; currentColIndex <= lastColIndex; currentColIndex++) {
			selectedValues.push(matrix[currentRowIndex][currentColIndex])
		}
	}

	if (operation === "S") return sumValues(selectedValues)
	else if (operation === "M") return mediaValues(selectedValues)
}

// * [0][1] -> [0][10]
// * [1][2] -> [1][09]
// * [2][3] -> [2][08]
// * [3][4] -> [3][07]
// * [4][5] -> [4][06]

function main() {
	const matrixValues = values.map(Number.parseFloat)

	const model = createSquareModel(12)
	const matrix = createMatrixFromModel(model, matrixValues)
	const response = selectedSupAreaToOperateFromSquareMatrix(matrix, (CMD === "S" ? "S" : "M"))

	console.log(response.toFixed(1))
}

main()