const { readFileSync } = require("node:fs")
const [[numPlayers, numTeams], ...players] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

function main() {
	const output = []
	const teams = Array.from({ length: +numTeams }, () => new Array(0))

	const sortedPlayersStack = players
		.slice(0, +numPlayers)
		.sort(([, habA], [, habB]) => Number.parseInt(habB, 10) - Number.parseInt(habA, 10))

	for (let i = 0; i < +numPlayers; i++)
		teams[i % +numTeams].push(sortedPlayersStack[i][0])

	for (let t = 0; t < +numTeams; t++) {
		teams[t].sort((nameA, nameB) => nameA.localeCompare(nameB, "en-US"))

		output.push(
			`Time ${t + 1}`,
			teams[t].join("\n"),
			""
		)
	}

	console.log(output.join("\n"))
}

main()
