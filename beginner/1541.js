const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(value => Number.parseInt(value, 10)))


function main() {
	const responses = []

	for (const [A, B, P] of input) {
		if (A == 0) break
		const side = Math.trunc(Math.sqrt(A * B * 1E2 / P))
		responses.push(side)
	}

	console.log(responses.join("\n"))
}

main()