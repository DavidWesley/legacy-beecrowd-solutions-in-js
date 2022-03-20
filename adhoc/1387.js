const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (const [A, B] of input)
		if (A == 0 || B == 0) break
		else responses.push(A + B)

	console.log(responses.join("\n"))
}

main()