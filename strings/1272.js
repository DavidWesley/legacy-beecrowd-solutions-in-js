const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/dev/stdin", "utf8").split("\n")

const joinMatchedStrings = (strSeq = "") => (strSeq.match(/(\b(\w))/g) || [""]).join("")

function main() {
	const joinedInittialLettersList = cases
		.slice(0, +numTestCases)
		.map(joinMatchedStrings)

	console.log(joinedInittialLettersList.join("\n"))
}

main()