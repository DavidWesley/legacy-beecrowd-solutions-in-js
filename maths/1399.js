const { readFileSync } = require("node:fs")
const [[N, M, U], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line
		.split(" ", 4)
		.map((value) => Number.parseInt(value, 10))
	)


function main() {
	const matrix = input.splice(0, N).flat(1)
	const queries = input.splice(0, M)

	for (const [L, R, v, p] of queries) {
		let k = 0
		for (let i = L; i <= R; i += 1) if (matrix[i - 1] < v) k += 1

		matrix[p - 1] = Math.trunc((U * k) / (R - L + 1))
	}

	console.log(matrix.join("\n"))
}

main()