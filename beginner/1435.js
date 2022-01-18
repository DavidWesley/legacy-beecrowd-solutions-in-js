const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((value) => Number.parseInt(value, 10))

function main() {
	const responses = []

	for (const size of lines) {
		if (size == 0) break
		if (isNaN(size)) break

		const to = Math.ceil(size / 2)
		const matrix = Array.from({ length: size }, () => new Array(size).fill(""))

		for (let from = 0; from < to; from++)
			for (let row = from; row < size - from; row++)
				for (let col = from; col < size - from; col++)
					matrix[row][col] = String(from + 1).padStart(3, " ")

		const printedMatrix = matrix.map((row) => row.join(" ")).join("\n")

		responses.push(printedMatrix, "")
	}

	console.log(responses.join("\n"))
}

main()