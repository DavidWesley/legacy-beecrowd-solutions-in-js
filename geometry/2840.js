const { readFileSync } = require("node:fs")
const [R, L] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

console.log(
	Math.floor(
		L / ((4 / 3) * Math.pow(R, 3) * 3.1415)
	)
)
