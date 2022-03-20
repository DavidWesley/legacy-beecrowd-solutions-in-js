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

function selectedLeftAreaToOperateFromSquareMatrix(matrix, operation) {
	const selectedValues = []

	const len = matrix.length
	const limiter = Math.round(len / 2) - 1

	for (let currentColIndex = 0; currentColIndex < limiter; currentColIndex++)
		for (let currentRowIndex = currentColIndex + 1; currentRowIndex < len - currentColIndex - 1; currentRowIndex++)
			selectedValues.push(matrix[currentRowIndex][currentColIndex])

	if (operation === "S") return sumValues(selectedValues)
	else if (operation === "M") return mediaValues(selectedValues)
}

// * [01][00]
// * [02][00] -> [02][01]
// * [03][00] -> [03][02]
// * [04][00] -> [04][03]
// * [05][00] -> [05][04]
// * [06][00] -> [06][04]
// * [07][00] -> [07][03]
// * [08][00] -> [08][02]
// * [09][00] -> [09][01]
// * [10][00]

function main() {
	const matrixValues = values.map(Number.parseFloat)

	const model = createSquareModel(12)
	const matrix = createMatrixFromModel(model, matrixValues)
	const response = selectedLeftAreaToOperateFromSquareMatrix(matrix, (CMD === "S" ? "S" : "M"))

	console.log(response.toFixed(1))
}

main()