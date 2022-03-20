const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(line => Number.parseInt(line, 10))

const squaredNaturalNumberSum = (nth) => nth * (nth + 1) * (2 * nth + 1) / 6

function main() {
	const responses = []

	for (const square of input) {
		if (square === 0) break
		responses.push(squaredNaturalNumberSum(square))
	}

	console.log(responses.join("\n"))
}

main()