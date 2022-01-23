const { readFileSync } = require("fs")
const [numTabs, numActions, ...actions] = readFileSync("/dev/stdin", "utf8").split(/\s+/g)

const ActionsEnum = Object.freeze({
	fechou: 1,
	clicou: -1,
})

function main() {
	const opendedTabs = actions
		.slice(0, +numActions)
		.reduce((openedTabs, actionName) => openedTabs + (ActionsEnum[actionName] ?? 0), +numTabs)

	console.log(opendedTabs)
}

main()