const { readFileSync } = require("fs")
const [firstNote, average] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map((line) => Number.parseInt(line))

console.log(2 * average - firstNote)