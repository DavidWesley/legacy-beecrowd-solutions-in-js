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

function selectedInfAreaToOperateFromSquareMatrix(matrix, operation) {
	const selectedValues = []

	const len = matrix.length
	const limiter = Math.round(len / 2)

	for (let currentRowIndex = len - 1; currentRowIndex > limiter; currentRowIndex--) {
		const firstColIndex = len - currentRowIndex
		const lastColIndex = currentRowIndex - 1

		for (let currentColIndex = firstColIndex; currentColIndex <= lastColIndex; currentColIndex++) {
			selectedValues.push(matrix[currentRowIndex][currentColIndex])
		}
	}

	if (operation === "S") return sumValues(selectedValues)
	else if (operation === "M") return mediaValues(selectedValues)
}

// * [07][05] -> [07][06]
// * [08][04] -> [08][07]
// * [09][03] -> [09][08]
// * [10][02] -> [10][09]
// * [11][01] -> [11][10]

function main() {
	const matrixValues = values.map(Number.parseFloat)

	const model = createSquareModel(12)
	const matrix = createMatrixFromModel(model, matrixValues)
	const response = selectedInfAreaToOperateFromSquareMatrix(matrix, (CMD === "S" ? "S" : "M"))

	console.log(response.toFixed(1))
}

main()