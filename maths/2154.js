const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)

function simplePolinomialDerivation(equation = '') {
	return equation.replace(/(\d*)([A-z]+)(\d*)/g, (_, cof, base, exp) => {
		if (cof == "") cof = "1"
		if (exp == "") exp = "1"

		const derivedCoefficient = Number.parseInt(cof, 10) * Number.parseInt(exp, 10)
		const derivedExponent = Number.parseInt(exp, 10) - 1

		if (["0", "1"].includes(exp)) return `${derivedCoefficient}`
		else if (exp == "2") return `${derivedCoefficient}${base}`
		else return `${derivedCoefficient}${base}${derivedExponent}`
	})
}

function main() {
	const responses = []

	for (let curr = input.next(); curr.done == false; curr = input.next()) {
		if (Boolean(Number.parseInt(curr.value, 10)) == false) break // EOFile

		const polynomialEquation = input.next().value || ""
		responses.push(simplePolinomialDerivation(polynomialEquation))
	}

	console.log(responses.join("\n"))
}

main()