const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const output = []

for (let i = 0; i < input.length;) {
	const numBooks = Number.parseInt(input[i], 10)
	const sortedBooksCodes = input.slice(i + 1, (i += numBooks + 1)).sort()

	Reflect.apply(Array.prototype.push, output, sortedBooksCodes)
}

console.log(output.join("\n"))