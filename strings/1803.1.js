const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

class Matring {
	/**
	 * @param {string[]} matrix
	 * @param {number} cols
	 * @param {number} rows
	 */
	static resolve(matrix, cols, rows) {
		const matrings = Array.from({ length: rows }, () => [])

		for (let row = 0; row < rows; row++)
			for (let col = 0; col < cols; col++)
				matrings[row].push(matrix[col][row])

		return matrings
	}

	/** @param {string[][]} matrings */

	static decode(matrings) {
		const nums = matrings.map((num) => Number.parseInt(num.join("")))

		const F = nums.shift()
		const L = nums.pop()
		const M = nums

		return M.map((m) => String.fromCharCode((F * m + L) % 257))
	}
}

function main() {
	const COLS = 4
	const ROWS = input[0].length

	const matring = Matring.resolve(input, COLS, ROWS)
	const chars = Matring.decode(matring)

	console.log(chars.join(""))
}

main()