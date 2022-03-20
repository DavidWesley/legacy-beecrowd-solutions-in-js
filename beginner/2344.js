const { readFileSync } = require("fs")
const [numericNote] = readFileSync("/dev/stdin", "utf8").split("\n")

function convertNumericToConceptNote(numericNote) {
	const inRange = ((value) => (min, max = value) => value === Math.min(Math.max(min, value), max))(numericNote)

	if (numericNote === 0) return "E"
	else if (inRange(1, 35)) return "D"
	else if (inRange(36, 60)) return "C"
	else if (inRange(61, 85)) return "B"
	else if (inRange(86, 100)) return "A"
}


console.log(convertNumericToConceptNote(Number.parseInt(numericNote, 10)))