const { readFileSync } = require("node:fs")

const [[N, M], ...table] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line
		.split(" ")
		.map(value => Number.parseInt(value, 10))
	)


function findLigthSaberPosition(matrix) {
	for (let i = 1; i < N - 1; i += 1) {
		for (let j = 1; j < M - 1; j += 1) {
			if (matrix[i][j] === 42) {
				if (
					matrix[i][j + 1] === 7 && matrix[i][j - 1] === 7
					&& matrix[i + 1][j] === 7 && matrix[i - 1][j] === 7
					&& matrix[i - 1][j + 1] === 7 && matrix[i - 1][j - 1] === 7
					&& matrix[i + 1][j + 1] === 7 && matrix[i + 1][j - 1] === 7
				) { return [i + 1, j + 1] }
			}
		}
	}

	return [0, 0]
}

console.log(findLigthSaberPosition(table).join(" "))