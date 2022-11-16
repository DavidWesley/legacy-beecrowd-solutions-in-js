const { readFileSync } = require("node:fs")
const [[size], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1 + 101)
	.map((line) => line.split(" ", 101).map((value) => Number.parseInt(value, 10)))

function main() {
	const output = Array.from({ length: size }, (_, i) => {
		return Array.from({ length: size }, (_, j) => {
			return (
				(input[i][j] || 0) +
				(input[i][j + 1] || 0) +
				(input[i + 1][j] || 0) +
				(input[i + 1][j + 1] || 0)
			) >= 2
				? "S"
				: "U"
		})
	})

	console.log(
		output
			.map((cams) => cams.join(""))
			.join("\n")
	)
}

main()
