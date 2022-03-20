const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/stdin", "utf8").split("\n")

const reverseStr = str => [...str].reverse().join("")

/** @param {any[][]} cases */

function makeMirrorSequence(cases) {
	const mirrorSequencesArray = []

	cases.forEach(([B, E], index) => {
		let sequence = ""
		const min = Number.parseInt(B)
		const max = Number.parseInt(E)

		for (let i = min; i <= max; i++) sequence += i

		const mirrorSequence = sequence.concat(reverseStr(sequence))
		mirrorSequencesArray.push(mirrorSequence)
	})

	return mirrorSequencesArray
}

function main() {
	const formmatedCases = cases.map((pair) => pair.split(" ")).slice(0, +numTestCases)
	const mirrorSequences = makeMirrorSequence(formmatedCases)

	console.log(mirrorSequences.join("\n"))
}

main()