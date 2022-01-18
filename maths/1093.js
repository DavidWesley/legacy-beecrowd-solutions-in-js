const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

/**
 * Returns the probability of each player losing the game.
 *
 * @param {number} N1
 * @param {number} N2
 * @param {number} at
 * @param {number} possibilities
 *
 * @return {[number, number]}
 */
function gambler(N1, N2, at, possibilities = 6) {
	let P = 0

	if (at == possibilities / 2)
		// probabiliy with 50% (Fair Coin)
		P = N2 / (N1 + N2)
	else {
		// unFair Coin P2 law is the answer for player1
		P = 1.0 - at / 6.0
		P = (1 - P) / P
		P = (1.0 - Math.pow(P, N2)) / (1.0 - Math.pow(P, N1 + N2))
	}

	return [P, 1 - P]
}


function main() {
	const responses = []

	for (const [EV1, EV2, AT, D] of input) {
		if ([EV1, EV2, AT, D].every((v) => v === 0)) break

		const [, probB] = gambler(Math.ceil(EV1 / D), Math.ceil(EV2 / D), AT, 6)
		responses.push((probB * 1e2).toFixed(1))
	}

	console.log(responses.join("\n"))
}

main()