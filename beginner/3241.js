const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1000 + 1)

function evaluateSimpleLinearExpression(expression = "") {
	while (expression.includes("("))
		expression = expression
			.replace(/\(([\d+\-*/ ]+?)\)/g, (_, op) => String(evaluateSimpleLinearExpression(op)))

	expression = expression
		.replace(/(-?\d+)\s*?([*/])\s?(-?\d+)/g, (_, numA, operator, numB) => {
			if (operator === "*") return String(Number.parseInt(numA, 10) * Number.parseInt(numB, 10))
			if (operator === "/") return String(Number.parseInt(numA, 10) / Number.parseInt(numB, 10))
		})
		.replace(/(-?\d+)\s*?([+-])\s*?(-?\d+)/g, (_, numA, operator, numB) => {
			if (operator === "+") return String(Number.parseInt(numA, 10) + Number.parseInt(numB, 10))
			if (operator === "-") return String(Number.parseInt(numA, 10) - Number.parseInt(numB, 10))
		})

	return Number(expression)
}

function main() {
	const output = new Array(Number.parseInt(numLines, 10))

	for (let index = 0; index < output.length; index++) {
		const line = input[index]
		output[index] = (line === "P=NP") ? "skipped" : evaluateSimpleLinearExpression(line)
	}

	console.log(output.join("\n"))
}

main()
