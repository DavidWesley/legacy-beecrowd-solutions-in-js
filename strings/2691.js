const { format } = require("util")
const { readFileSync } = require("fs")

const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split("x").map(Number))

function main() {
	const responses = []

	for (const [X, Y] of lines.slice(0, numLines)) {
		if (X != Y)
			for (let mult = 5; mult <= 10; mult++)
				responses.push(format("%d x %d = %d && %d x %d = %d", X, mult, X * mult, Y, mult, Y * mult))
		else
			for (let mult = 5; mult <= 10; mult++)
				responses.push(format("%d x %d = %d", X, mult, X * mult))
	}

	console.log(responses.join("\n"))
}

main()