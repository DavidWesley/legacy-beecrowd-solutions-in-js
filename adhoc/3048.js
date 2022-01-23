const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const Integer = (num = "") => Number.parseInt(num, 10)

function getLongerSequenceWithoutCommounsValues(originalSequence = []) {
	for (var i = 0, counter = 0, last; i < originalSequence.length; i++) {
		if (originalSequence[i] != last) {
			last = originalSequence[i]
			counter++
		}
	}

	return counter
}

function main() {
	const sequence = lines.slice(0, +numCases).map(Integer)

	console.log(getLongerSequenceWithoutCommounsValues(sequence))
}

main()
