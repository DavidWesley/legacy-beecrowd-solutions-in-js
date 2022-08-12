const { readFileSync } = require("fs")
const [numCases, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const volleyballTeamStatics = {
		serve: { total: 0, success: 0 },
		block: { total: 0, success: 0 },
		attack: { total: 0, success: 0 },
	}

	for (let i = 0; i < Number.parseInt(numCases, 10); i += 1) {
		input.shift()

		const [S, B, A] = input.shift().split(" ", 3).map(value => Number.parseInt(value, 10))
		const [S1, B1, A1] = input.shift().split(" ", 3).map(value => Number.parseInt(value, 10))

		volleyballTeamStatics.serve.total += S
		volleyballTeamStatics.block.total += B
		volleyballTeamStatics.attack.total += A

		volleyballTeamStatics.serve.success += S1
		volleyballTeamStatics.block.success += B1
		volleyballTeamStatics.attack.success += A1
	}

	const succesfullyServesPercentual = volleyballTeamStatics.serve.success / volleyballTeamStatics.serve.total * 1e2
	const succesfullyBlocksPercentual = volleyballTeamStatics.block.success / volleyballTeamStatics.block.total * 1e2
	const succesfullyAttacksPercentual = volleyballTeamStatics.attack.success / volleyballTeamStatics.attack.total * 1e2

	console.log(`Pontos de Saque: ${succesfullyServesPercentual.toFixed(2)} %.`)
	console.log(`Pontos de Bloqueio: ${succesfullyBlocksPercentual.toFixed(2)} %.`)
	console.log(`Pontos de Ataque: ${succesfullyAttacksPercentual.toFixed(2)} %.`)
}

main()