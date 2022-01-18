const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (const line of input) {
		if (line.includes(NaN)) break
		if (line.every((line) => line == 0)) break

		const [H1, M1, H2, M2] = line

		const h = ((24 + H2 - H1) % 24) * 60
		const m = M2 - M1

		const timeDiff = (1440 + (h + m)) % 1440 || 1440

		responses.push(timeDiff)
	}

	console.log(responses.join("\n"))
}

main()