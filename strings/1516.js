const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const output = []

while (input.length > 0) {
	const [numRows, numCols] = input
		.shift()
		.split(" ", 2)
		.map((value) => Number.parseInt(value, 10))

	if (numRows == 0 || numCols == 0) break

	const originalImageArr = input.splice(0, +numRows)

	const [A, B] = input
		.shift()
		.split(" ", 2)
		.map((value) => Number.parseInt(value, 10))

	const horizontalZoomTax = B / numCols
	const verticalZoomTax = A / numRows

	const newImageArr = originalImageArr.flatMap((str) => {
		const s = str
			.substr(0, numCols)
			.replace(/./g, (char) => char.repeat(horizontalZoomTax))

		return new Array(verticalZoomTax).fill(s)
	})

	output.push(newImageArr.join("\n"), "")
}

console.log(output.join("\n"))