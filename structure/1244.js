const { readFileSync } = require("node:fs")
const [[numLines], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(words => words.split(" "))

function main() {
	const output = Array.from(
		{ length: Number.parseInt(numLines, 10) },
		(_, index) => input[index].sort((a, b) => b.length - a.length).join(" ")
	)

	console.log(output.join("\n"))
}

main()
