const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const MAX_ACCEPTABLE_INTEGER = Math.pow(2, 31) - 1 // 2147483647

const isALegalInteger = (num) => Number.isInteger(num) && num <= MAX_ACCEPTABLE_INTEGER

function FriendlyIntParser(str = "") {
	const processed = str
		.replace(/[l]/g, "1")
		.replace(/[Oo]/g, "0")
		.replace(/[\,\s]/g, "")

	return processed.replace(/\D/g, "") === processed
		? Number.parseInt(processed, 10)
		: NaN
}

function main() {
	const output = []

	for (const line of input) {
		const processedInteger = FriendlyIntParser(line)
		output.push(isALegalInteger(processedInteger) ? processedInteger : "error")
	}

	output.pop()
	console.log(output.join("\n"))
}

main()
