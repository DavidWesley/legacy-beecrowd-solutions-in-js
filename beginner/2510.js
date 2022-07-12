const { readFileSync } = require("node:fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = lines
		.slice(0, Number.parseInt(numLines, 10))
		.map(name => name != "Batmain" ? "Y" : "N")

	console.log(responses.join("\n"))
}

main()