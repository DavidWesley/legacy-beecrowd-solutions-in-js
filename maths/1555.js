const { readFileSync } = require("fs")
const [[N], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 2).map((value) => Number.parseInt(value, 10)))

/**
 * @typedef {"Rafael" | "Beto" | "Carlos" } FunctionsNamesUnionType
 * @typedef {(x: number, y:number) => number} FunctionSignatureType
 */

/** @type {Readonly<{ [P in FunctionsNamesUnionType]: FunctionSignatureType }>} */
const FunctionsEnum = Object.freeze({
	"Rafael": (x, y) => Math.pow(3 * x, 2) + Math.pow(y, 2),
	"Beto": (x, y) => 2 * Math.pow(x, 2) + Math.pow(5 * y, 2),
	"Carlos": (x, y) => -100 * x + Math.pow(y, 3),
})

/** @param {Array<[string, FunctionSignatureType]>} fns */
function FunctionsList(fns) {
	function getBiggerEntry(x, y) {
		const results = fns.map(([_, fn]) => fn(x, y))
		const bigger = Math.max.apply(null, results)
		return fns[results.indexOf(bigger)]
	}

	return { getBiggerEntry }
}

function main() {
	const output = []
	const functionListInstance = FunctionsList(Object.entries(FunctionsEnum))

	for (let index = 0; index < N; index += 1) {
		const [X, Y] = input[index]
		const [name] = functionListInstance.getBiggerEntry(X, Y)
		output.push(`${name} ganhou`)
	}

	console.log(output.join("\n"))
}

main()