const { readFileSync } = require("node:fs")
const [I] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

function generateTimesTable(num, max = 10) {
	return Array.from(
		{ length: max },
		(_, i) => `${i + 1} x ${num} = ${num * (i + 1)}`
	)
}

console.log(generateTimesTable(I, 10).join("\n"))
