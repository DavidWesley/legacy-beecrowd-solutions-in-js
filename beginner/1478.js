const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const size of input) {
		if (size === "0") break

		const matrix = Array.from({ length: +size }, () => new Array(size).fill(""))

		for (let row = 0; row < +size; row++)
			for (let col = 0; col < +size; col++)
				matrix[row][col] = String(Math.abs(row - col) + 1).padStart(3, " ")

		responses.push(matrix.map(row => row.join(" ")).join("\n"), "")
	}

	console.log(responses.join("\n"))
}

main()