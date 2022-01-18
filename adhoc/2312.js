const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

/** @typedef {[string, number, number, number]} olympicNationType */

/**
 * @param {olympicNationType} nationA
 * @param {olympicNationType} nationB
 */

function olimpicsMedalsCompare(nationA, nationB) {
	if (nationA[1] !== nationB[1]) return nationB[1] - nationA[1] // DESC - Medals O
	else if (nationA[2] !== nationB[2]) return nationB[2] - nationA[2] // DESC - Medals P
	else if (nationA[3] !== nationB[3]) return nationB[3] - nationA[3] // DESC - Medals B
	else if (nationA[0] !== nationB[0]) return nationA[0].localeCompare(nationB[0]) // ASC - name
	else return 0
}

function main() {
	const size = Number.parseInt(numLines, 10)
	const responses = lines
		.slice(0, size)
		.sort(olimpicsMedalsCompare)
		.map(line => line.join(" "))

	console.log(responses.join("\n"))
}

main()