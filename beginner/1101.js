const { readFileSync } = require("fs")
const inputs = readFileSync("/dev/stdin", "utf8").split("\n")
const inputPairs = inputs.map((inputPair) => inputPair.split(" ").map((num) => Number.parseInt(num))
)

function orderLimits([firstLimit, secondLimit = firstLimit]) {
	const inferior = Math.min(firstLimit, secondLimit)
	const superior = Math.max(firstLimit, secondLimit)
	return [inferior, superior]
}

function sumsArray(arr = [0], initialValue = 0) {
	return arr.reduce((acc, cur) => acc + cur, initialValue)
}

function makeIntSequence(minLimit, maxLimit) {
	return Array.from(
		{ length: maxLimit - minLimit + 1 },
		(_, i) => minLimit + i
	)
}

function main() {
	const responses = []

	for (const [f, s] of inputPairs) {
		if (f <= 0 || s <= 0) break

		const ordenedLimits = orderLimits([f, s])
		const sequence = makeIntSequence(...ordenedLimits)
		const sum = sumsArray(sequence)

		responses.push(`${sequence.join(" ")} Sum=${sum}`)
	}

	console.log(responses.join("\n"))
}

main()
