const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const output = new Array(+numCases)

for (let currentCaseIndex = 0; currentCaseIndex < +numCases; currentCaseIndex++) {
	const numSpeakers = Number.parseInt(lines.shift(), 10)
	const uniquesLangs = [...new Set(lines.splice(0, numSpeakers))]

	output[currentCaseIndex] = uniquesLangs.length === 1 ? uniquesLangs[0] : "ingles"
}

console.log(output.join("\n"))