const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(value => Number.parseInt(value, 10)))


function main() {
	const responses = []

	for (let i = 0; i < input.length; i += 2) {
		if (input[i + 0].every(v => v === 0)) break

		const [A, N, M] = input[i + 0]
		const [C1, C2, C3] = input[i + 1]

		const baseFactor = Math.abs(C3 - C2) / (M + 1)
		const heightFactor = C1 / (N + 1)
		const area = A * baseFactor * heightFactor

		responses.push(Math.round(area))
	}

	console.log(responses.join("\n"))
}

main()