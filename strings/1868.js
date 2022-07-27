const { readFileSync } = require("node:fs")

const sizes = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => Number.parseInt(line, 10))

class SquareMatrix {
	constructor(size = 0, value = "") {
		this.matrix = Array.from(
			{ length: size },
			() => new Array(size).fill(value)
		)
	}

	set(i, j, value) { this.matrix[i][j] = value }
	get(i, j) { return this.matrix[i][j] }

	/**
	 * Returns a string that represents the matrix formatted
	 * @param {SquareMatrix} matrix
	 * @param {string} joiner
	 */
	static format(matrix, joiner = "") {
		return matrix.matrix.map(row => row.join(joiner)).join("\n")
	}
}


const DirectionsEnum = Object.freeze({
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
})


function main() {
	const output = []

	for (const size of sizes) {
		if (size === 0) break

		const mid = Math.floor(size / 2)

		let [i, j] = [mid, mid]
		let [row, col] = [mid, mid + 1]

		let k = 1
		let move = DirectionsEnum.RIGHT
		const matrix = new SquareMatrix(size, "O")

		// eslint-disable-next-line no-constant-condition
		while (true) {
			matrix.set(i, j, "X")
			output.push(SquareMatrix.format(matrix), "@")
			if (i == size - 1 && j == size - 1) break// End of matrix
			matrix.set(i, j, "O")

			if (move == DirectionsEnum.LEFT) --j
			else if (move == DirectionsEnum.RIGHT) ++j
			else if (move == DirectionsEnum.UP) --i
			else if (move == DirectionsEnum.DOWN) ++i

			if (j == col && i == row) {
				if (move == DirectionsEnum.RIGHT) { row -= k; move = DirectionsEnum.UP }
				else if (move == DirectionsEnum.LEFT) { row += k; move = DirectionsEnum.DOWN }
				else if (move == DirectionsEnum.UP) { k += 1; col -= k; move = DirectionsEnum.LEFT }
				else if (move == DirectionsEnum.DOWN) { k += 1; col += k; move = DirectionsEnum.RIGHT }
			}
		}
	}

	console.log(output.join("\n"))
}

main()