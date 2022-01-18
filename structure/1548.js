const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (let caseIndex = 0; caseIndex < numCases; caseIndex++) {
		const [N] = lines[2 * caseIndex]
		const originalGrades = lines[2 * caseIndex + 1].slice(0, N)
		const sortedGrades = [...originalGrades].sort((a, b) => b - a)

		let countDiffentOrder = 0

		for (let index = 0; index < N; index++)
			if (sortedGrades[index] == originalGrades[index]) // Dont changed of position
				countDiffentOrder++

		responses.push(countDiffentOrder)
	}

	console.log(responses.join("\n"))
}

main()