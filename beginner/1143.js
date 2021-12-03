const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").shift()

function range(start, end = start, step = 1) {
	const length = Math.floor((end - start + 1) / step) + (Math.sign(Math.min(start, end)) === -1 ? 1 : 0)
	return Array.from({ length }, (_, i) => start + step * i)
}

function main() {
	const responses = []
	const limit = Number.parseInt(input)

	const baseSequence = range(1, limit)
	const seqPowerToTwo = baseSequence.map((value) => Math.pow(value, 2))
	const seqPowerToThree = baseSequence.map((value) => Math.pow(value, 3))

	for (const index in baseSequence) {
		responses.push(
			`${baseSequence[index]} ${seqPowerToTwo[index]} ${seqPowerToThree[index]}`
		)
	}

	console.log(responses.join("\n"))
}

main()