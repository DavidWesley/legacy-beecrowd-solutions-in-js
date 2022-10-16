const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1 + 100)

function generateNeymarSortNumber(str = "") {
	return str // as digits's set
		.replace(/\D/g, "") // the string must be sanitized
		.split("")
		.sort((digitA, digitB) => digitA.localeCompare(digitB, "en-US", { numeric: true }))
		.join("")
		.replace(/(^0+)([1-9])([1-9]*)$/, "$2$1$3")
}

const output = Array.from(
	{ length: Number.parseInt(numLines, 10) },
	(_, index) => generateNeymarSortNumber(input[index])
)

console.log(output.join("\n"))
