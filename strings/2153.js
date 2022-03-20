const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const omitRepeatedPartFromEnd = (str = "") => str.replace(/(\w+)\1$/si, "$1")

function main() {
	const responses = []

	for (const line of input)
		if (line === "") break // EOFile Condition
		else responses.push(omitRepeatedPartFromEnd(line))

	console.log(responses.join("\n"))
}

main()