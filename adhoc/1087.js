const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (const [X1, Y1, X2, Y2] of input) {
		if ([X1, Y1, X2, Y2].every((crd) => crd == 0)) break

		if (X1 == X2 && Y1 == Y2) responses.push("0")
		else if ((X1 != X2 && Y1 == Y2) || (X1 == X2 && Y1 != Y2) || Math.abs(X1 - X2) == Math.abs(Y1 - Y2)) responses.push("1")
		else responses.push("2")
	}

	console.log(responses.join("\n"))
}

main()