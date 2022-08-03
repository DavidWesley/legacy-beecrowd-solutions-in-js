const { readFileSync } = require("fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map((value) => Number.parseInt(value, 10))

if (
	A + B == C
	|| A + C == B
	|| B + C == A
	|| A == B
	|| A == C
	|| B == C
) {
	console.log("S")
} else {
	console.log("N")
}