const { readFileSync } = require("fs")

const [numCompetitors, minimunAprovedCompetitors, ...scoresList] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((value) => Number.parseInt(value, 10))

/**
 * @param {string | any[]} arr
 * @param {number} pos
 */
const at = (arr, pos) => arr[(arr.length + pos) % arr.length]


function main() {
	const sortedScoresList = scoresList.sort((a, b) => b - a) // reverse sorting
	const responses = sortedScoresList.slice(0, minimunAprovedCompetitors)

	for (
		let index = minimunAprovedCompetitors;
		index < numCompetitors && at(responses, -1) == at(sortedScoresList, index);
		index++) {
		responses.push(at(sortedScoresList, index))
	}

	console.log(responses.length)
}

main()