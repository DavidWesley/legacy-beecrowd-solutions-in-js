const { readFileSync } = require("fs")
const [L, CMD, ...values] = readFileSync("/dev/stdin", "utf8").split('\n')

const matrixValues = values.map(parseFloat)

/** @param {number[]} values */
const sumValues = ([...values], initialValue = 0) => values.reduce((acc, cur) => acc + cur, initialValue)

/** @param {number[]} values */
const mediaValues = ([...values]) => sumValues(values) / values.length

function createMatrixFromModel(model = { lengths: { rows: 0, cols: 0 } }, values = [], defaultReplecmentValue = 0) {
	const { rows: rowsLenght, cols: colsLength } = model.lengths

	const defaultRows = () => new Array(colsLength).fill(defaultReplecmentValue)

	return Array.from({ length: rowsLenght }, () => {
		return defaultRows().map((defaultValue) => values && values.shift() || defaultValue)
	})
}

/**
 * @param {number[][]} matrix
 * @param {number} selectedColumn
 * @param {string} operation
 */

function selectedColumnToOperateFromMatrix(matrix, selectedColumn, operation) {
	const selectedValues = matrix.map((row) => row[selectedColumn])

	if (operation === 'S') return sumValues(selectedValues)
	else if (operation === 'M') return mediaValues(selectedValues)
}

function main() {
	const model = { lengths: { cols: 12, rows: 12 } }
	const matrix = createMatrixFromModel(model, matrixValues, 0)
	const response = selectedColumnToOperateFromMatrix(matrix, +L, CMD)

	console.log(`${response.toFixed(1)}`)
}

main()