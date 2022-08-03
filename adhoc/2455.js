const { readFileSync } = require("fs")
const [P1, C1, P2, C2] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 4)
	.map((line) => Number.parseInt(line, 10))

function main() {
	const left = P1 * C1
	const right = P2 * C2

	if (left === right) console.log("0")
	else if (left < right) console.log("1")
	else if (left > right) console.log("-1")
}

main()