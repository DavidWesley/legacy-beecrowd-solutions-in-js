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
		if (!this.validate(winner)) {
			this.#rules[winner] = {}
		}
		this.#rules[winner][loser] = 1

		return this
	}

	/**
	 * @param {playerType} player1
	 * @param {playerType} player2
	 */
	judge(player1, player2) {
		return player1.choice === player2.choice
			? null
			: this.#rules[player1.choice][player2.choice] === 1
				? player1
				: player2
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
	 * @param {playerType} player1
	 * @param {playerType} player2
	 */
	static winner(player1, player2) {
		const staticClassRef = Rock_Paper_Scissors_Lizard_Spock

		if (
			(
				staticClassRef.#RULES.validate(player1.choice) &&
				staticClassRef.#RULES.validate(player2.choice)
			) == false
		)
			throw new Error("Wrong Player's Choice!")

		return staticClassRef.#RULES.judge(player1, player2)
	}
}

function main() {
	const nameA = "rajesh"
	const nameB = "sheldon"

	const responses = lines
		.slice(0, Number.parseInt(numCases, 10))
		.map(([c1, c2]) => {
			const /** @type {playerType}*/ p1 = { name: nameA, choice: c1 }
			const /** @type {playerType}*/ p2 = { name: nameB, choice: c2 }

			const result = Game.winner(p1, p2)

			if (result === null) return "empate"
			else if (result.choice === c1) return result.name
			else if (result.choice === c2) return result.name
		})

	console.log(responses.join("\n"))
}

main()
