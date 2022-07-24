const { readFileSync } = require("fs")

const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => Number.parseInt(line, 10))

const n = (sum) => Math.floor((Math.sqrt(8 * sum + 1) - 1) / 2)

function main() {
	const responses = new Array(numLines)

	for (let index = 0; index < numLines; index++)
		responses[index] = n(lines[index])

	console.log(responses.join("\n"))
}

main()