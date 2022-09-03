// // TODO: Criar um parse para frações
// // TODO: Renomear as coisas devidamente

// const { readFileSync } = require("node:fs")
// const [numTestCases, ...equations] = readFileSync("/dev/stdin", "utf8").split("\n")

// /** @typedef {{num: number, den: number}} fractionType */

// // const FormattedEquationsFunctionsEnum = Object.freeze({
// // 	sum: (N1 = 1, D1 = 1, N2 = 0, D2 = 0) => `${(N1 * D2 + N2 * D1)}/${(D1 * D2)}`,
// // 	subtract: (N1 = 1, D1 = 1, N2 = 0, D2 = 0) => `${(N1 * D2 - N2 * D1)}/${(D1 * D2)}`,
// // 	multiply: (N1 = 0, D1 = 0, N2 = 1, D2 = 1) => `${(N1 * N2)}/${(D1 * D2)}`,
// // 	divide: (N1 = 0, D1 = 0, N2 = 1, D2 = 1) => `${(N1 * D2)}/${(N2 * D1)}`,
// // })


// class Frac {
// 	/**
// 	 * @param {number} numerator
// 	 * @param {number} denominator
// 	 */
// 	constructor(numerator, denominator) {
// 		this.num = numerator
// 		this.den = denominator
// 	}

// 	static parse() { }

// 	// static #genericFractionOperation(fracA, fracB) { return Frac}

// 	formatt
// }

// /** @type {{[k: string]: (fracA: fractionType, fracB: fractionType) => string}} */

// const FormattedEquationsFunctionsEnum = Object.freeze({
// 	sum: (fracA, fracB) => `${(fracA.num * fracB.den + fracB.num * fracA.den)}/${(fracA.den * fracB.den)}`,
// 	subtract: (fracA, fracB) => `${(fracA.num * fracB.den - fracB.num * fracA.den)}/${(fracA.den * fracB.den)}`,
// 	multiply: (fracA, fracB) => `${(fracA.num * fracB.num)}/${(fracA.den * fracB.den)}`,
// 	divide: (fracA, fracB) => `${(fracA.num * fracB.den)}/${(fracB.num * fracA.den)}`,
// })

// // Run Call all function here

// function main() {
// 	const responses = equations.slice(0, +numTestCases).map(resolveEquation)
// 	console.log(responses.join("\n"))
// }

// main()


// // Return the final equation solved

// /** @param {string} equation */

// function resolveEquation(equation) {
// 	const unstructured = destructSimpleLinearEquation(equation)
// 	const initialFraction = defineOperation(unstructured)
// 	const reducedFraction = defineOperation(reduceFraction(initialFraction))

// 	return `${initialFraction} = ${reducedFraction}`
// }


// // Functions Destructs

// /** @param { string } fraction */

// function destructFraction(fraction) {
// 	return fraction.replace(/\s/gs, "").split("/").map(Number.parseFloat)
// }

// /** @param {string} equation */

// function destructSimpleLinearEquation(equation) {
// 	const equationRegex = /(\d+)\/(\d+)([+\-*/])(\d+)\/(\d+)/s
// 	return equation.replace(/\s/g, "").match(equationRegex).slice(1, 5)
// }


// // Set the correct operation from equation input

// /** @param {[number, number, string, number, number]} equation */

// function defineOperation(equation) {
// 	const [N1, D1, operator, N2, D2] = equation

// 	if (operator === "+") return FormattedEquationsFunctionsEnum.sum(N1, D1, N2, D2)
// 	else if (operator === "-") return FormattedEquationsFunctionsEnum.subtract(N1, D1, N2, D2)
// 	else if (operator === "*") return FormattedEquationsFunctionsEnum.multiply(N1, D1, N2, D2)
// 	else if (operator === "/") return FormattedEquationsFunctionsEnum.divide(N1, D1, N2, D2)

// 	return FormattedEquationsFunctionsEnum.multiply(N1, D1)
// }


// // Return the fraction formatted

// /** @param {string} fraction */

// function reduceFraction(fraction) {
// 	const [N, D] = destructFraction(fraction)
// 	const MDC = GCD([N, D])

// 	return [N / MDC, D / MDC]
// }

// // Aditionals Functions

// const GCD = ([x, y]) => {
// 	if (isNaN(x) || isNaN(y)) return
// 	x = Math.abs(x), y = Math.abs(y)
// 	while (y !== 0) [x, y] = [y, x % y]
// 	return x
// }