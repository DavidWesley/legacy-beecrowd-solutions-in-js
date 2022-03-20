const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function createInterval(min = 0, max = min, step = 1) {
	step = step >= 1 ? step : 1
	const size = Math.ceil((max - min + 1) / step)

	return Array.from({ length: size }, (_, i) => min + step * i)
}

/** @param {number} num */

function areAllDistinctDigits(num) {
	const digits = [...`${num}`]
	const uniqueDigits = [...new Set(digits)].join("")

	return uniqueDigits === num.toString()
}

function main() {
	const responses = []
	const limitsPairs = input.map(limits => limits.split(" ").map(num => Number.parseInt(num, 10)))

	for (const [min, max] of limitsPairs) {
		if (isNaN(min) || isNaN(max)) break // EOFile Condition Verification

		const interval = createInterval(min, max, 1)
		const numsWithUniquesDigits = interval.filter(areAllDistinctDigits)

		responses.push(numsWithUniquesDigits.length)
	}

	console.log(responses.join("\n"))
}

main()