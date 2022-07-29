const { readFileSync } = require("node:fs")
const [numLines, ...years] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))


function main() {
	const CURRENT_YEAR = 2015
	const output = new Array(numLines)

	for (let index = 0; index < numLines; index += 1) {
		const time = Math.abs(years[index] - CURRENT_YEAR)
		output[index] = (CURRENT_YEAR <= years[index]) ? `${time + 1} A.C.` : `${time} D.C.`
	}

	console.log(output.join("\n"))
}

main()