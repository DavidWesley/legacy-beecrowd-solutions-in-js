const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const toInt = (value = "") => Number.parseInt(value, 10)

function main() {
	const responses = []

	for (let index = 0, counter = 1; index < input.length; index++) {
		const line = input[index]
		const [marblesNumbers, queriesCount] = line.split(" ").map(toInt)

		if (marblesNumbers === 0 && queriesCount === 0) break

		const startMarbleIndex = index + 1
		const endMarbleIndex = marblesNumbers + startMarbleIndex

		const startQueriesIndex = endMarbleIndex
		const endQueriesIndex = queriesCount + startQueriesIndex

		const marbles = input
			.slice(startMarbleIndex, endMarbleIndex)
			.map(toInt)
			.sort((a, b) => a - b)

		const queries = input
			.slice(startQueriesIndex, endQueriesIndex)
			.map(toInt)

		responses.push(`CASE# ${counter++}:`)

		for (const query of queries) {
			if (marbles.includes(query))
				responses.push(`${query} found at ${marbles.indexOf(query) + 1}`)
			else
				responses.push(`${query} not found`)
		}
	}

	console.log(responses.join("\n"))
}

main()