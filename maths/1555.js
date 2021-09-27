const { readFileSync } = require("fs")
const [numCases, ...points] = readFileSync('/dev/stdin', "utf8").split("\n")

const pow = Math.pow

const FuncitionsEnum = Object.freeze({
	Rafael: (x, y) => pow(3 * x, 2) + pow(y, 2),
	Beto: (x, y) => 2 * pow(x, 2) + pow(5 * y, 2),
	Carlos: (x, y) => -100 * x + pow(y, 3),
})

function List(enumFunctions) {
	const names = Object.keys(enumFunctions)
	const funcs = Object.values(enumFunctions)

	function getNameFromBiggerResult(x, y) {
		const results = funcs.map((fn) => fn(x, y))
		const bigger = Math.max(...results)

		return names[results.indexOf(bigger)]
	}

	return { getNameFromBiggerResult }
}

function main() {
	const responses = []
	const listIstance = List(FuncitionsEnum)

	const coordenatesList = points.slice(0, +numCases).map((coords) => {
		const [x, y] = coords.split(" ")
		return [+x, +y]
	})

	for (const [x, y] of coordenatesList) {
		const winner = listIstance.getNameFromBiggerResult(x, y)
		responses.push(`${winner} ganhou`)
	}

	console.log(`${responses.join("\n")}`)
}

main()