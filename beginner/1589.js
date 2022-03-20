const { readFileSync } = require("fs")
const [[numTestCase], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))

function main() {
	const responses = lines.slice(0, +numTestCase).map(([A, B]) => A + B)
	console.log(responses.join("\n"))
}

main()