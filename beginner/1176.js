const { readFileSync } = require("fs")
const [numTestCases, ...positions] = readFileSync("/dev/stdin", "utf8").split('\n')

function binetFormule(nth) {
	const sqrt5 = Math.sqrt(5)
	const nthPower = (equation) => Math.pow(equation / 2, nth) / sqrt5

	return Math.round(nthPower(1 + sqrt5) - nthPower(1 - sqrt5))
}

function main() {
	const responses = positions.slice(0, +numTestCases).map(position => {
		return `Fib(${position}) = ${binetFormule(+position)}`
	})

	console.log(`${responses.join("\n")}`)
}

main()
