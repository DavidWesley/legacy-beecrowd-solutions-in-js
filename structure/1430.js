const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(/\n/g)

const NotesMap = Object.freeze(
	Object.fromEntries([
		["W", 1 / 1],
		["H", 1 / 2],
		["Q", 1 / 4],
		["E", 1 / 8],
		["S", 1 / 16],
		["T", 1 / 32],
		["X", 1 / 64],
	])
)

function musicalCompassCorrectDurationNums(musicalTempo = "") {
	const hasCorrectDuration = (dur) => dur === 1
	const musicalSinglesList = musicalTempo.match(/\b([A-Z]+)\b/g)

	const numberMeasuresCorrectDurs = musicalSinglesList
		.map(
			(curretSingleSequence) => {
				const duration = [...curretSingleSequence].reduce((sum, char) => sum + NotesMap[char], 0)
				return hasCorrectDuration(duration)
			}
		)
		.filter(Boolean)
		.length

	return numberMeasuresCorrectDurs
}

function main() {
	const responses = []

	for (const compassSequence of input) {
		if (compassSequence == "*") break
		const correctsSinglesDuration = musicalCompassCorrectDurationNums(compassSequence)

		responses.push(correctsSinglesDuration)
	}

	console.log(responses.join("\n"))
}

main()