const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function getCharFromSequence(sequence = "") {
	const BASE = 96

	const splittedSeq = sequence.split(" ")
	const len = splittedSeq.length - 1

	const [point] = splittedSeq
	const index = BASE + point.length + len * 3

	return String.fromCharCode(index)
}

function main() {
	const responses = []

	while (input.length > 0) {
		const rows = Number.parseInt(input.shift())

		if (isNaN(rows)) break // EOFile Condition Verification

		const pointsSequences = input.splice(0, rows).map(getCharFromSequence)
		responses.push(...pointsSequences)
	}

	console.log(responses.join("\n"))
}

main()