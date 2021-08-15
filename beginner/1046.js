const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const integers = input
	.splice(0, input.indexOf("0"))
	.map((num) => Number.parseInt(num))

function makeIntConsecSequence(minLimit = 0, maxLimit = minLimit) {
	return Array.from(
		{ length: maxLimit - minLimit + 1 },
		(_, i) => minLimit + i
	)
}

function main() {
	const responses = []

	for (const integer of integers) {
		const sequence = makeIntConsecSequence(1, integer)
		responses.push(`${sequence.join(" ")}`)
	}

	console.log(responses.join("\n"))
}

main()
