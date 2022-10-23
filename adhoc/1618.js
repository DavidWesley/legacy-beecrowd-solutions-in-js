const { readFileSync } = require("node:fs")

const [[numLines], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 10).map(value => Number.parseInt(value, 10)))

function main() {
	const output = []

	for (let index = 0; index < numLines; index += 1) {
		// eslint-disable-next-line no-unused-vars
		const [Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, RX, RY] = input[index]

		// Ax === Dx | Ay === By
		// Bx === Cx | Dy === Cy
		output.push((RX >= Ax && RX <= Cx) && (RY >= By && RY <= Dy) ? 1 : 0)
	}

	console.log(output.join("\n"))
}

main()
