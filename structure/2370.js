const { readFileSync } = require("fs")
const [[numPlayers, numTeams], ...players] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

function main() {
	const teams = Array.from({ length: +numTeams }, () => new Array(0))

	const sortedPlayersStack = players
		.slice(0, +numPlayers)
		.sort(([, habA], [, habB]) => Number.parseInt(habB, 10) - Number.parseInt(habA, 10))

	for (let i = 0; i < +numPlayers; i++)
		teams[i % +numTeams].push(sortedPlayersStack[i][0])

	for (let t = 0; t < +numTeams; t++) {
		teams[t].sort((nameA, nameB) => nameA.localeCompare(nameB, "en-US"))

		console.log(`Time ${t + 1}`)
		console.log(`${teams[t].join("\n")}\n`)
	}
}

main()