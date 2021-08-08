const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split("\n")

function makeIntConsecSequence(minLimit = 0, maxLimit = minLimit) {
	return Array.from(
		{ length: maxLimit - minLimit + 1 },
		(_, i) => minLimit + i
	)
}

function powSeqFromANumber(sequence = [0], power = 1) {
	return sequence.map((value) => Math.pow(value, power))
}

function main() {
	const responses = []
	const limit = parseInt(input.shift())

	const baseSequence = makeIntConsecSequence(1, limit)
	const seqPowerToTwo = powSeqFromANumber(baseSequence, 2)
	const seqPowerToThree = powSeqFromANumber(baseSequence, 3)

	for (const index in baseSequence) {
		responses.push(
			`${baseSequence[index]} ${seqPowerToTwo[index]} ${seqPowerToThree[index]}`
		)
	}

	console.log(responses.join("\n"))
}

main()
