const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {number | string} num */
const isOdd = (num) => Math.abs(Number(num)) % 2 === 1

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map((line) => (isOdd(line) ? 1 : 0))

	console.log(responses.join("\n"))
}

main()