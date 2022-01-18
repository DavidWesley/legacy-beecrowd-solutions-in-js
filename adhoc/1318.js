const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", { encoding: "utf8" })
	.split("\n")
	.map((line) => line.split(" ").map(Number))

/**
 * @param {any[]} list
 * @returns {{ [n: string]: number }}
 */

function getFrequenciesOnQueue(list) {
	return list.reduce((frequencies, key) => ((frequencies[`${key}`] = ++frequencies[`${key}`] || 1), frequencies), {})
}

function main() {
	const responses = []

	for (let index = 0; index < input.length; index += 2) {
		const [N, M] = input[index]
		if (N == 0 && M == 0) break

		const tickets = input[index + 1].slice(0, M)

		const fakeTicketsQuant = Object
			.entries(getFrequenciesOnQueue(tickets))
			.reduce((sum, [key, frequency]) => (frequency > 1 || Number.parseInt(key, 10) > N) ? sum + 1 : sum, 0)

		responses.push(fakeTicketsQuant)
	}

	console.log(responses.join("\n"))
}

main()