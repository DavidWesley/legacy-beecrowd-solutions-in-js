const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = cases.slice(0, +numTestCases).map((text, index) => `resposta ${index + 1}: ${text}`)
	console.log(responses.join("\n"))
}

main()