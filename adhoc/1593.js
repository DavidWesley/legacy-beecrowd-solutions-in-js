const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {Parameters<BigIntConstructor>[0]} num */

function binaryFunction(num) {
	return BigInt(num).toString(2).match(/1/g).length
}

function main() {
	const responses = lines.slice(0, +numLines).map(binaryFunction)
	console.log(responses.join("\n"))
}

main()
