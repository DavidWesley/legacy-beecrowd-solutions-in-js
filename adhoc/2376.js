const { readFileSync } = require("node:fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 15)
	.map(line => line.split(" ", 2).map(value => Number.parseInt(value, 10)))

function main() {
	let TEAMS = [
		"A", "B",
		"C", "D",
		"E", "F",
		"G", "H",
		"I", "J",
		"K", "L",
		"M", "N",
		"O", "P"
	]

	while (TEAMS.length > 1) {
		const size = TEAMS.length / 2
		const turn = input.splice(0, size)

		for (let i = 0; i < size; i += 1) {
			const [tA, tB] = turn[i]
			delete TEAMS[2 * i + ((tA > tB) ? 1 : 0)]
		}

		TEAMS = TEAMS.filter(Boolean)
	}

	console.log(TEAMS.join("\n"))
}

main()
