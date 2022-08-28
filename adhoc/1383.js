//// SOLVER ////

/**
 * @description
 * 		Each row must contain the digits 1–9 without repetition.
 * 		Each column must contain the digits 1–9 without repetition.
 * 		Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1–9 without repetition.
 */
class SudokuSolver {
	static get #DEFAULT_BOARD_SIZE() { return 9 }

	/** @param {number[][]} board */
	static isValidFullFilledSudokuBoard(board) {
		if (board.length !== SudokuSolver.#DEFAULT_BOARD_SIZE) return false

		const box = /** @type {Set<number>}*/ (new Set())
		const column = /** @type {Set<number>}*/ (new Set())

		for (let i = 0; i < SudokuSolver.#DEFAULT_BOARD_SIZE; i += 1) {
			if (board[i].length !== SudokuSolver.#DEFAULT_BOARD_SIZE) return false

			for (let j = 0; j < SudokuSolver.#DEFAULT_BOARD_SIZE; j += 1) {
				const value = board[i][j]
				if (value <= 0 || value > SudokuSolver.#DEFAULT_BOARD_SIZE) return false
				if (board[i].includes(value, j + 1)) return false

				column.add(board[j][i])

				if (i % 3 !== 0 || j % 3 !== 0) continue

				for (let r = i; r < i + 3; r += 1)
					for (let c = j; c < j + 3; c += 1)
						box.add(board[r][c])

				if (box.size !== SudokuSolver.#DEFAULT_BOARD_SIZE) return false
				else box.clear()
			}

			if (column.size !== SudokuSolver.#DEFAULT_BOARD_SIZE) return false
			else column.clear()
		}

		return true
	}
}

//// MAIN ////

const { format } = require("node:util")
const { readFileSync } = require("node:fs")
const [[numCases], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 9).map(value => Number.parseInt(value, 10)))


function main() {
	const output = new Array(3 * numCases)

	for (let index = 0; index < numCases; index += 1) {
		const board = input.splice(0, 9)

		output[3 * index + 0] = format("Instancia %d", index + 1)
		output[3 * index + 1] = SudokuSolver.isValidFullFilledSudokuBoard(board) ? "SIM" : "NAO"
		output[3 * index + 2] = ""
	}

	console.log(output.join("\n"))
}

main()