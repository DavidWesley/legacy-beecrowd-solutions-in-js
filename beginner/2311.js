const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let index = 0; index < Number.parseInt(numCases, 10); index++) {
		const pos = index * 3
		const [name, dificultyLevel, judgeAvaliations] = lines.slice(pos, (pos + 3))

		const validAvaliations = judgeAvaliations
			.split(" ", 7)
			.map(Number.parseFloat)
			.sort((a, b) => a - b)
			.slice(1, -1)

		const sum = validAvaliations.reduce((sum, note) => sum + note, 0)
		const ponctuation = Number.parseFloat(dificultyLevel) * sum

		responses.push(`${name} ${ponctuation.toFixed(2)}`)
	}

	console.log(responses.join("\n"))
}

main()