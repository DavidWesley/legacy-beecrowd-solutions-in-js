const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(Number.parseFloat)

/** @param {number[]} nums */
const calcAverage = (nums) => nums.reduce((sum, value) => sum + value, 0) / nums.length

function main() {
	const LOWER_LIMIT = 0
	const UPPER_LIMIT = 10

	const output = []
	const validNotesList = []

	for (let index = 0, validNotesCounter = 0; index < input.length && validNotesCounter < 2; index++) {
		const grade = input[index]

		if (LOWER_LIMIT <= grade && grade <= UPPER_LIMIT) validNotesCounter = validNotesList.push(grade)
		else output.push("nota invalida")
	}

	console.log(output.join("\n"))
	console.log("media = %s", calcAverage(validNotesList).toFixed(2))
}

main()
