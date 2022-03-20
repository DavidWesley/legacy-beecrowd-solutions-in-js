const { readFileSync } = require("fs")
const [numCases, ...linesList] = readFileSync("/dev/stdin", "utf8").split("\n").map(line => Number.parseInt(line, 10))

const getFinitePGSum = (initVal, tax, numElements) => initVal * (1 - Math.pow(tax, numElements)) / (1 - tax)

function main() {
	const responses = linesList
		.slice(0, +numCases)
		.map(numLines => getFinitePGSum(1, 2, numLines))

	console.log(responses.join("\n"))
}

main()