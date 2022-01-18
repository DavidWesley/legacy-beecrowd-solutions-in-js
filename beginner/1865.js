const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map((line) => line.startsWith("Thor") ? "Y" : "N")

	console.log(responses.join("\n"))
}

main()