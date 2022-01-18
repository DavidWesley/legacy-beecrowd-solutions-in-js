const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = lines
		.slice(0, +numLines)
		.sort((strA, strB) => strA.charAt(0).localeCompare(strB.charAt(0)))

	console.log(responses.join("\n"))
}

main()