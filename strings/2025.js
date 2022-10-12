const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1e4 + 1)


function main() {
	const output = input
		.splice(0, Number.parseInt(numLines, 10))
		.map(line => line.replace(/([a-z])(oulupukk)([a-z])/gi, "J$2i"))

	console.log(output.join("\n"))
}

main()
