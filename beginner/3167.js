const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").toLowerCase().split("\n")

const reverse = (str) => Array.from(str).reverse().join("")

class Matrix {
	/**
	 * @param {number} rows
	 * @param {number} cols
	 */
	static createModel(rows = 0, cols = 0) { return ({ dimensions: { cols, rows } }) }
	/**
	 * Create a square matrix from a object model
	 * @template T
	 * @param {ReturnType<typeof Matrix.createModel>} model
	 * @param {Array<T>} values
	 * @param {T} defaultReplacementValue
	 */
	static createFromModel(model, values, defaultReplacementValue = null) {
		return Array.from({ length: model.dimensions.rows }, (_, rowIndex) => {
			return Array.from({ length: model.dimensions.cols }, (_, colIndex) => {
				return values[(model.dimensions.cols * rowIndex) + colIndex] || defaultReplacementValue
			})
		})
	}
}


/** @param {string[][]} matrix  */
function findsWordsRelativeToSecondaryDiagonalFromMatrix(matrix) {
	const rows = matrix.length
	const cols = matrix[0].length

	const secondaryDiagonalCharSequence = Array.from({ length: Math.min(rows, cols) }, (_, i) => matrix[i][cols - i - 1]).join("")
	const aboveSecondaryDiagonalCharSequencesList = new Array(cols - 1).fill("")
	const belowSecondaryDiagonalCharSequencesList = new Array(rows - 1).fill("")

	// ABOVE SECONDARY DIAGONAL CHARACTER SEQUENCE LIST
	for (let u = 1; u <= aboveSecondaryDiagonalCharSequencesList.length; u++)
		for (let i = 0, j = cols - u - 1; i < rows && j >= 0; i++, j--)
			aboveSecondaryDiagonalCharSequencesList[u - 1] += matrix[i][j] || "0"

	// BELOW SECONDARY DIAGONAL CHARACTER SEQUENCE LIST
	for (let u = 1; u <= belowSecondaryDiagonalCharSequencesList.length; u++)
		for (let i = u, j = cols - 1; i < rows && j >= 0; i++, j--)
			belowSecondaryDiagonalCharSequencesList[u - 1] += matrix[i][j] || "0"


	return (word = "") => {
		word = word.toLowerCase()
		const reversed = reverse(word)

		if (secondaryDiagonalCharSequence.includes(word) || secondaryDiagonalCharSequence.includes(reversed)) return "SECONDARY DIAGONAL"
		if (aboveSecondaryDiagonalCharSequencesList.some(seq => seq.includes(word) || seq.includes(reversed))) return "ABOVE SECONDARY DIAGONAL"
		if (belowSecondaryDiagonalCharSequencesList.some(seq => seq.includes(word) || seq.includes(reversed))) return "BELOW SECONDARY DIAGONAL"
		return "NOT FOUND"
	}
}


function main() {
	const output = []

	const [numQueries, rows, cols] = input.shift().split(" ", 3).map(value => Number.parseInt(value, 10))
	const words = input.splice(0, numQueries)
	const chars = input.splice(0).map(row => row.split("", cols)).flat(1)

	const squareMatrixModel = Matrix.createModel(rows, cols)
	const matrix = Matrix.createFromModel(squareMatrixModel, chars, "")
	const queriableMatrixSequencesInstance = findsWordsRelativeToSecondaryDiagonalFromMatrix(matrix)

	for (const word of words) {
		const result = queriableMatrixSequencesInstance(word)

		switch (result) {
			case "SECONDARY DIAGONAL": { output.push(`1 Palavra "${word}" na diagonal secundaria`); break }
			case "ABOVE SECONDARY DIAGONAL": { output.push(`2 Palavra "${word}" acima da diagonal secundaria`); break }
			case "BELOW SECONDARY DIAGONAL": { output.push(`3 Palavra "${word}" abaixo da diagonal secundaria`); break }
			case "NOT FOUND": { output.push(`4 Palavra "${word}" inexistente`); break }
		}
	}

	console.log(output.join("\n"))
}

main()

/**
	Conforme a existência de cada palavra N, informe:

	1 Palavra "X" na diagonal secundaria
	2 Palavra "X" acima da diagonal secundaria
	3 Palavra "X" abaixo da diagonal secundaria
	4 Palavra "X" inexistente
*/