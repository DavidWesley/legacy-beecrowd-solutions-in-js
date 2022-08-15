const { readFileSync } = require("node:fs")
const [[numLines], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 100 + 1)
	.map((line) => line.split(" ", 1000))


function main() {
	const output = input
		.slice(0, Number.parseInt(numLines, 10))
		.map(words => Array.from(new Set(words).keys()))
		.map(words => words.sort((wA, wB) => wA.localeCompare(wB)))
		.map(words => words.join(" "))

	console.log(output.join("\n"))
}

main()