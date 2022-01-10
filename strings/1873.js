const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

class Rock_Paper_Scissors_Lizard_Spock {
	static #players = ["tesoura", "lagarto", "papel", "pedra", "spock"]
	static #RULES = {
		tesoura: ["lagarto", "papel"],
		lagarto: ["spock", "papel"],
		papel: ["spock", "pedra"],
		pedra: ["tesoura", "lagarto"],
		spock: ["tesoura", "pedra"]
	}

	static get players() {
		return this.#players
	}

	static winner(player1 = "", player2 = "") {
		player1 = player1.toLowerCase()
		player2 = player2.toLowerCase()

		const staricClasReference = Rock_Paper_Scissors_Lizard_Spock
		const playersReference = staricClasReference.#players

		if ((playersReference.includes(player1) && playersReference.includes(player2)) == false)
			throw new Error("Wrong Player Name!")

		if (staricClasReference.#RULES[player1].includes(player2)) return player1
		if (staricClasReference.#RULES[player2].includes(player1)) return player2
		return "empate"
	}
}

function main() {
	const responses = lines.slice(0, +numCases).map(([p1, p2]) => {
		const result = Rock_Paper_Scissors_Lizard_Spock.winner(p1, p2)

		if (result == p1) return "rajesh"
		if (result == p2) return "sheldon"
		return "empate"
	})

	console.log(`${responses.join("\n")}`)
}

main()
