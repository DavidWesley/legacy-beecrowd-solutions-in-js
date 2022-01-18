const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => Number.parseInt(line, 10))

const BIT_NOTES = [50, 10, 5, 1]

function main() {
	const responses = []

	for (let i = 0; i < lines.length; i++) {
		let sum = lines[i]

		if (sum == 0) break
		const notes = Array(BIT_NOTES.length).fill(0)

		for (let j = 0; j < BIT_NOTES.length; j++) {
			if (sum == 0) break
			const bitNote = BIT_NOTES[j]

			while (sum - bitNote >= 0) {
				sum -= bitNote
				notes[j] += 1
			}
		}

		responses.push(
			`Teste ${i + 1}`,
			notes.join(" "),
			""
		)
	}

	console.log(responses.join("\n"))
}

main()