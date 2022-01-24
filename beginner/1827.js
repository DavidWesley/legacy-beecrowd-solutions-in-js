const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []
	const FILL_DEFAULT = "0"

	for (const line of lines) {
		if (line === "") break // EOF

		const size = Number.parseInt(line, 10)
		const table = Array.from({ length: size }, () => new Array(size).fill(FILL_DEFAULT))

		const lower = Math.floor(size / 3)
		const middle = Math.floor(size / 2)
		const upper = size - lower

		for (let i = 0; i < size; i++)
			for (let j = 0; j < size; j++)
				if (i == middle && j == middle) table[i][j] = "4"
				else if (i >= lower && i < upper && j >= lower && j < upper) table[i][j] = "1"
				else if (i == j) table[i][j] = "2"
				else if (i + j + 1 == size) table[i][j] = "3"

		responses.push(table.map((row) => row.join("")).join("\n"), "")
	}

	console.log(responses.join("\n"))
}

main()