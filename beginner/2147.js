const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = lines.slice(0, +numLines).map((line) => (line.length * 0.01).toFixed(2))
	console.log(responses.join("\n"))
}

main()