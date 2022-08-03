const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {Array<string>} teams*/

function generateSoccerScoreboard([...teams]) {
	return {
		wons: Object.fromEntries(teams.map(team => [team, 0])),
		draws: 0,
		games: 0
	}
}

function main() {

	const GrenaisScoreBoard = generateSoccerScoreboard(["gremio", "inter"])
	const responses = []

	for (let index = 0; index < input.length; index += 2) {
		const [interGoals, gremioGoals] = input[index]
			.split(" ", 2)
			.map(Number)

		const hasNext = input[index + 1] == "1"

		GrenaisScoreBoard.games += 1

		if (gremioGoals > interGoals) GrenaisScoreBoard.wons.gremio += 1
		else if (gremioGoals < interGoals) GrenaisScoreBoard.wons.inter += 1
		else GrenaisScoreBoard.draws += 1

		if (!hasNext) {
			responses.push(
				...Array(GrenaisScoreBoard.games).fill("Novo grenal (1-sim 2-nao)"),
				`${GrenaisScoreBoard.games} grenais`,
				`Inter:${GrenaisScoreBoard.wons.inter}`,
				`Gremio:${GrenaisScoreBoard.wons.gremio}`,
				`Empates:${GrenaisScoreBoard.draws}`,
			)

			if (GrenaisScoreBoard.wons.inter == GrenaisScoreBoard.wons.gremio) responses.push("Nao houve vencedor")
			else responses.push(`${GrenaisScoreBoard.wons.inter > GrenaisScoreBoard.wons.gremio ? "Inter" : "Gremio"} venceu mais`)

			break
		}
	}

	console.log(responses.join("\n"))
}

main()