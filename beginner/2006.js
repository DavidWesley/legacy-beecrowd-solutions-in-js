const { readFileSync } = require("fs")
const [correctTeaId, ...suggestTeaIDs] = readFileSync("/dev/stdin", "utf8").split(/\s/)

function getCompetidorCorrectSuggestsLength(suggestsIds, correctId) {
	return suggestsIds.filter(id => id === correctId).length
}

function main() {
	const correctLen = getCompetidorCorrectSuggestsLength(suggestTeaIDs, correctTeaId)

	console.log(correctLen)
}

main()