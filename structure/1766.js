const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8").split("\n").map((line) => line.split(" "))

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)

/** @typedef {[string, number, number, number]} reindeerType */
/** @param {reindeerType[]} reindeerList */

function sortReindeer(reindeerList) {
	return reindeerList.sort((reindeerA, reindeerB) => {
		if (reindeerA[1] !== reindeerB[1]) return reindeerB[1] - reindeerA[1]										// Weights 	- DESC
		else if (reindeerA[2] !== reindeerB[2]) return reindeerA[2] - reindeerB[2]							// Ages 		- ASC
		else if (reindeerA[3] !== reindeerB[3]) return reindeerA[3] - reindeerB[3]							// Heigths 	- ASC
		else if (reindeerA[0] !== reindeerB[0]) return reindeerA[0].localeCompare(reindeerB[0])	// Names 		-	ASC

		else return 0
	})
}

function main() {
	const responses = []

	for (let index = 0; index < +numCases; index++) {
		const [N, M] = input.next().value || [""]

		const /**@type {reindeerType[]} */ reindeerList = Array.from({ length: +N }, () => {
			const [name, weight, age, height] = input.next().value || [""]
			return [name, +weight, +age, +height]
		})

		const sortedReindeerList = sortReindeer(reindeerList)
			.slice(0, +M)
			.map(([name], index) => `${index + 1} - ${name}`)

		responses.push(
			`CENARIO {${index + 1}}`,
			...sortedReindeerList
		)
	}

	console.log(responses.join("\n"))
}

main()