const { readFileSync } = require("fs")
const [numCases, ...choices] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @typedef {{name: string, choice: string} | null } playerType */

class Referee {
	#rules = {}
	constructor() { }

	validate(choice = "") {
		return Reflect.has(this.#rules, choice)
	}
	get choices() {
		return Object.keys(this.#rules)
	}

	/**
	 * @param {string} winner
	 * @param {string} loser
	 */
	learn(winner, loser) {
		if (this.validate(loser) == false) this.#rules[loser] = {}
		if (this.validate(winner) == false) this.#rules[winner] = {}

		this.#rules[winner][loser] = 1

		return this
	}

	/**
	 * @param {playerType} playerA
	 * @param {playerType} playerB
	 *
	 * @return {{ status: "draw" | "win", data: { winner: playerType, loser: playerType } }}
	 */
	judge(playerA, playerB) {
		const status = playerA.choice === playerB.choice ? "draw" : "win"
		const data = { winner: null, loser: null }

		if (status === "win") {
			data.winner = this.#rules[playerA.choice][playerB.choice] === 1 ? playerA : playerB
			data.loser = data.winner === playerA ? playerB : playerA
		}

		return { status, data }
	}
}

const Game = class Rock_Paper_AirAtack {
	static #RULES = new Referee()
		.learn("ataque", "papel")
		.learn("ataque", "pedra")
		.learn("pedra", "papel")

	static get choices() {
		return this.#RULES.choices
	}

	/**
	 * @param {playerType} playerA
	 * @param {playerType} playerB
	 */
	static winner(playerA, playerB) {
		const staticClassRef = Rock_Paper_AirAtack

		if (
			(
				staticClassRef.#RULES.validate(playerA.choice) &&
				staticClassRef.#RULES.validate(playerB.choice)
			) == false
		)
			throw new Error(`Wrong Player's Choice! > ${playerA.choice} or ${playerB.choice}`)

		return staticClassRef.#RULES.judge(playerA, playerB).data.winner
	}
}

function main() {
	const nameA = "Jogador 1"
	const nameB = "Jogador 2"

	const responses = new Array(Number.parseInt(numCases, 10))

	for (let index = 0; index < responses.length; index++) {
		const choiceA = choices[index * 2 + 0]
		const choiceB = choices[index * 2 + 1]

		const /** @type {playerType}*/ p1 = { name: nameA, choice: choiceA.toLowerCase() }
		const /** @type {playerType}*/ p2 = { name: nameB, choice: choiceB.toLowerCase() }

		const winner = Game.winner(p1, p2)

		if (winner === null) {
			if (p1.choice === "pedra") responses[index] = "Sem ganhador"
			else if (p1.choice === "papel") responses[index] = "Ambos venceram"
			else if (p1.choice === "ataque") responses[index] = "Aniquilacao mutua"
		}
		else
			responses[index] = winner.name.concat(" ", "venceu")
	}

	console.log(responses.join("\n"))
}

main()

/**
"Jogador 1 venceu": se o Jogador Um tiver vencido a partida
"Jogador 2 venceu": se o Jogador Dois tiver vencido a partida
"Ambos venceram": se os dois jogadores tiverem vencido a partida
"Sem ganhador": se não houver ganhador
"Aniquilacao mutua": se ocorrer Aniquilação Mútua
 */
