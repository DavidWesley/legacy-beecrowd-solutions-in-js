const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const omitRepeatedPartFromStart = (str = "") => str.replace(/\b(\w+)\1/gi, "$1")

function main() {
	const responses = []

	for (const line of input)
		if (line === "") break // EOFile Condition
		else responses.push(omitRepeatedPartFromStart(line))

	console.log(responses.join("\n"))
}

main()