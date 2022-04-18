const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

/**
 * @typedef {{name: string, choice: string}} playerType
 */

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

const Game = class Rock_Paper_Scissors_Lizard_Spock {
	static #RULES = new Referee()
		.learn("tesoura", "lagarto").learn("tesoura", "papel")
		.learn("lagarto", "spock").learn("lagarto", "papel")
		.learn("papel", "spock").learn("papel", "pedra")
		.learn("pedra", "tesoura").learn("pedra", "lagarto")
		.learn("spock", "tesoura").learn("spock", "pedra")

	static get choices() {
		return this.#RULES.choices
	}

	/**
	 * @param {playerType} playerA
	 * @param {playerType} playerB
	 */
	static winner(playerA, playerB) {
		const staticClassRef = Rock_Paper_Scissors_Lizard_Spock

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
	const nameA = "rajesh"
	const nameB = "sheldon"

	const responses = lines
		.slice(0, Number.parseInt(numCases, 10))
		.map(([choiceA, choiceB]) => {
			const /** @type {playerType}*/ p1 = { name: nameA, choice: choiceA }
			const /** @type {playerType}*/ p2 = { name: nameB, choice: choiceB }

			const winner = Game.winner(p1, p2)

			if (winner === null) return "empate"
			else return winner.name
		})

	console.log(responses.join("\n"))
}

main()
