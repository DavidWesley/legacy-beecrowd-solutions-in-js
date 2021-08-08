const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const media = ([...nums] = [0]) => nums.reduce((a, b) => a + b, 0) / nums.length

function validateNotes(notesArr = [], settedLimits = [0, 0], maxValidNotes = notesArr.length) {
	settedLimits = settedLimits.every(lim => lim === 0) ? [0, 10] : [Math.min(...settedLimits), Math.max(...settedLimits)]
	const isValid = (note = -1) => (note >= settedLimits[0] && note <= settedLimits[1])

	const valid = []
	const invalid = []

	for (const note of notesArr) {
		if (valid.length === maxValidNotes) break
		isValid(note) ? valid.push(note) : invalid.push(note)
	}

	return [valid, invalid]
}

function main() {
	const responses = []

	const listNotes = input.map(parseFloat)
	const [validNotes, invalidNotes] = validateNotes(listNotes, [0, 10], 2)

	const mediaNotes = media(validNotes)

	invalidNotes.forEach(() => { responses.push('nota invalida') })
	responses.push(`media = ${mediaNotes.toFixed(2)}`)

	console.log(responses.join('\n'))
}

main()