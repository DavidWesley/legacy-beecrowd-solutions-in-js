const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const commandOperation = input.shift()
const matrixValues = input.map(Number)

function sumsArray(arr = [0], initialValue = 0) {
	return arr.reduce((acc, cur) => acc + cur, initialValue)
}

function mediaArray(arr = [0]) {
	return sumsArray(arr) / arr.length
}

function createMatrixFromModel(model = { lengths: { rows: 0, cols: 0 } }, values = [], defaultReplecmentValue = 0) {
	const { rows: rowsLenght, cols: colsLength } = model.lengths

	const defaultRows = () => new Array(colsLength).fill(defaultReplecmentValue)

	return Array.from({ length: rowsLenght }, () => {
		return defaultRows().map((defaultValue) => values.shift() ?? defaultValue)
	})
}

function selectedAreaToOperateFromSquareMatrix(matrix = [[0]], operation = '') {
	const selectedValues = []
	const limiter = (matrix.length / 2) - 1

	for (let currentRowIndex = 0; currentRowIndex < limiter; currentRowIndex++) {
		const firstColIndex = currentRowIndex + 1
		const lastColIndex = (limiter * 2) - currentRowIndex

		for (let currentColIndex = firstColIndex; currentColIndex <= lastColIndex; currentColIndex++) {
			selectedValues.push(matrix[currentRowIndex][currentColIndex])
		}
	}

	if (operation === 'S') return sumsArray(selectedValues)
	else if (operation === 'M') return mediaArray(selectedValues)
}

// * [0][1] -> [0][10]
// * [1][2] -> [1][09]
// * [2][3] -> [2][08]
// * [3][4] -> [3][07]
// * [4][5] -> [4][06]

function main() {
	const model = { lengths: { cols: 12, rows: 12 } }
	const matrix = createMatrixFromModel(model, matrixValues, 0)
	const response = selectedAreaToOperateFromSquareMatrix(matrix, commandOperation) //=

	console.log(response.toFixed(1))
}

main()