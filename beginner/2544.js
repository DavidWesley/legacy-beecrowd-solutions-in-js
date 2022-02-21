const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((value) => Number.parseInt(value, 10))

function main() {
	const responses = []

	for (let i = 0; isNaN(input[i]) == false; i++)
		responses.push(Math.log2(input[i]))

	console.log(responses.join("\n"))
}

main()