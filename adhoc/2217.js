const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map(Number)
		.map(line => line % 2 == 0 ? 1 : 9)


	console.log(responses.join("\n"))
}

main()