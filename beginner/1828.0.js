const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))


const Games = {
	Pedra_Papel_Tesoura_Lagarto_Spock: {
		WinsToDefeats: {
			lagarto: ["papel", "spock"],
			papel: ["pedra", "spock"],
			pedra: ["lagarto", "tesoura"],
			spock: ["pedra", "tesoura"],
			tesoura: ["lagarto", "papel"]
		}
	}
}


function main() {
	const { WinsToDefeats } = Games.Pedra_Papel_Tesoura_Lagarto_Spock

	const responses = lines
		.slice(0, Number.parseInt(numLines, 10))
		.map(([S, R]) => [S.toLowerCase(), R.toLowerCase()])
		.map(([S, R], index) => {
			let message = "De novo"

			if (Reflect.has(WinsToDefeats, S) && Reflect.has(WinsToDefeats, R))
				if (WinsToDefeats[S].includes(R)) message = "Bazinga"
				else if (WinsToDefeats[R].includes(S)) message = "Raj trapaceou"

			return `Caso #${index + 1}: ${message}!`
		})

	console.log(responses.join("\n"))
}

main()