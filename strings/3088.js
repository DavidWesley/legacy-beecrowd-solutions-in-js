const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const omitSpaceBeforeCommaOrPeriod = (str = "") => str.replace(/ ([,.])/gm, "$1")

function main() {
	const responses = []

	for (const line of input)
		if (line === "") break // EOFile Condition
		else responses.push(omitSpaceBeforeCommaOrPeriod(line))

	console.log(responses.join("\n"))
}

main()