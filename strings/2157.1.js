const { readFileSync } = require("fs")
const [[numCases], ...limitsPairList] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((num) => Number.parseInt(num, 10)))

const reverseString = (str = "") => [...str].reverse().join("")

/**
 * @param {number} min
 * @param {number} max
 */

function makeMirrornedNumbersSequence(min, max) {
	const sequence = Array.from(
		{ length: max - min + 1 },
		(_, index) => index + min
	).join("")

	return sequence.concat(reverseString(sequence))
}

function main() {
	const responses = limitsPairList
		.slice(0, numCases)
		.map(([min, max]) => makeMirrornedNumbersSequence(min, max))

	console.log(responses.join("\n"))
}

main()
