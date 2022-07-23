const { readFileSync } = require("node:fs")
const [text] = readFileSync("/dev/stdin", "utf8").split(" ", 1)

const output = text
	.replace(/[0369]/g, "")
	.split("")
	.map(Number)
	.reduce((sum, digit) => (sum + digit) % 3, 0)

console.log(output)