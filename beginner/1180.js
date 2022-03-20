const { readFileSync } = require("fs")
const [numTestCases, ...values] = readFileSync("/dev/stdin", "utf8")
	.split(/\s/)
	.map(value => Number.parseInt(value, 10))


function main() {
	const responses = []
	const minValue = Math.min(...values.slice(0, numTestCases))
	const minValueIndex = values.indexOf(minValue)

	responses.push(
		`Menor valor: ${minValue}`,
		`Posicao: ${minValueIndex}`
	)

	console.log(responses.join("\n"))
}

main()