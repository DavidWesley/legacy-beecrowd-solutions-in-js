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

function selectedAreaAboveMainDiagonaToOperateFromSquareMatrix(matrix, operation) {
	const selectedValues = []

	for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++)
		for (let colIndex = rowIndex + 1; colIndex < matrix.length; colIndex++)
			selectedValues.push(matrix[rowIndex][colIndex])

	switch (operation) {
		case "S": return sumValues(selectedValues)
		case "M": return mediaValues(selectedValues)
		default: return 0
	}
}


function main() {
	const matrixValues = values.map(Number.parseFloat)

	const model = createSquareModel(12)
	const matrix = createMatrixFromModel(model, matrixValues)
	const response = selectedAreaAboveMainDiagonaToOperateFromSquareMatrix(matrix, (CMD === "S" ? "S" : "M"))

	console.log(response.toFixed(1))
}

main()