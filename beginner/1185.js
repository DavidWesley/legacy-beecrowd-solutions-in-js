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

function selectedAreaAboveSecondaryDiagonaToOperateFromSquareMatrix(matrix, operation) {
	const selectedValues = []
	const limit = matrix.length - 1

	for (let rowIndex = 0; rowIndex < limit; rowIndex++)
		for (let colIndex = 0; colIndex < limit - rowIndex; colIndex++)
			selectedValues.push(matrix[rowIndex][colIndex])

	if (operation === "S") return sumValues(selectedValues)
	else if (operation === "M") return mediaValues(selectedValues)
}


function main() {
	const matrixValues = values.map(Number.parseFloat)

	const model = createSquareModel(12)
	const matrix = createMatrixFromModel(model, matrixValues)
	const response = selectedAreaAboveSecondaryDiagonaToOperateFromSquareMatrix(matrix, (CMD === "S" ? "S" : "M"))

	console.log(response.toFixed(1))
}

main()