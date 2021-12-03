const { readFileSync } = require("fs")
const cash = Number.parseInt(
	readFileSync("/dev/stdin", "utf8").split("\n").shift(),
	10
)

/**
 * @param {number} value
 * @param {number[] | null} notes
 * @return {[number[], number[]]}
 */

function getFewestNotesSequence(value, notes = null) {
	const sequenceNotes = []
	const defaultNotes = notes ?? [100, 50, 20, 10, 5, 2, 1]

	for (let i = 0, sum = 0; i < defaultNotes.length; i++) {
		const note = defaultNotes[i]
		const cashBack = value - sum
		const multiple = Math.floor(cashBack / note)
		const cashValue = note * multiple

		sum += multiple >= 1 ? cashValue : 0
		sequenceNotes.push(multiple)
	}

	return [sequenceNotes, defaultNotes]
}

/**
 * @param {number[]} multiples
 * @param {number[]} defaultNotes
 */

function createMessagesNotes(multiples, defaultNotes) {
	return Array.from(
		{ length: multiples.length },
		(multiple, index) => `${multiple} nota(s) de R$ ${defaultNotes[index].toFixed(2)}`
	)
}

function main() {
	const [multiples, defaultNotes] = getFewestNotesSequence(cash)
	console.log(cash)

	for (const msg of createMessagesNotes(multiples, defaultNotes))
		console.log(msg)
}

main()
