const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function extractNumbersFromText(text, quantities = 1) {
	return (text.match(/([1-9]\d*)/g) ?? new Array(quantities).fill(0))
		.slice(0, quantities)
		.map(Number)
}

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map(line => extractNumbersFromText(line, 3).reduce((sum, value) => sum + value, 0))

	console.log(responses.join("\n"))
}

main()