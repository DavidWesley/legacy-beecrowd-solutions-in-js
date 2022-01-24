const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const repeat = Number.parseInt(input[0])
	const HOs = "Ho ".repeat(repeat).trimEnd()

	console.log("%s!", HOs)
}

main()