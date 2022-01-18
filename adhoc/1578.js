const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))


const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)


const Num = {
	square(num = 0) {
		if (Math.log2(num) > 26.5) return BigInt(num) ** 2n
		else return Math.pow(num, 2)
	}
}

/** @param { any[][] } matrix */

function alignFromRigthByColumns(matrix) {
	const paddingsSize = new Array(matrix.length).fill(0)
	const columnPlaceholderArray = new Array(matrix.length).fill(0)

	for (let col = 0; col < matrix.length; col++) {
		const columnLens = columnPlaceholderArray.map((_, row) => `${matrix[row][col]}`.length)
		const biggestNumLengthForThisColumn = Reflect.apply(Math.max, null, columnLens)

		paddingsSize[col] = biggestNumLengthForThisColumn
	}

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix.length; col++) {
			matrix[row][col] = String(matrix[row][col]).padStart(paddingsSize[col], " ")
		}
	}

	return matrix
}


function main() {
	const responses = []

	for (let index = 0; index < numCases; index++) {
		const matrixSize = input.next().value[0]
		const squareMatrix = Array.from({ length: matrixSize }, () => (input.next().value || [0]).map(Num.square))
		const alignedColumns = alignFromRigthByColumns(squareMatrix).map(row => row.join(" ")).join("\n")

		responses.push(`Quadrado da matriz #${index + 4}:\n${alignedColumns}`)
	}

	console.log(responses.join("\n\n"))
}

main()