const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const output = []

while (input.length > 0) {
	const currentCase = input.splice(0, 3)
	if (currentCase.includes("")) break // EOFile Condition

	const [originalTag, numericTag, text] = currentCase

	const replacedTags = text
		.replace(
			/<([0-9a-z=/ ]*)>/gi,
			(_, group) => `<${group.replace(new RegExp(originalTag, "gi"), numericTag)}>`
		)

	output.push(replacedTags)
}

console.log(output.join("\n"))