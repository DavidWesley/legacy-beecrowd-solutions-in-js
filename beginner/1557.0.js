const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const T of input) {
		if (T == "0") break

		const size = Number.parseInt(T, 10)
		const padLen = `${Math.pow(2, (size - 1) * 2)}`.length
		const matrix = Array.from({ length: size }, () => [])

		for (let row = 0; row < size; row++)
			for (let col = 0; col < size; col++)
				matrix[row][col] = Math.pow(2, row + col)
					.toString(10)
					.padStart(padLen, " ")

		responses.push(matrix.map((row) => row.join(" ")).join("\n"), "")
	}

	console.log(responses.join("\n"))
}

main()