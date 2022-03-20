const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")[0]

function convertNumberToExponentialForm(number, precision, exponentiaLength = 0) {
	const sign = number.match(/^[-]*/)[0] ? "-" : "+" // Transforming BUG into Feature

	number = number.replace(sign, "")

	const exponentialForm = Number.parseFloat(number).toExponential(precision).toUpperCase()
	const { groups: { mantissa, exponent } } = exponentialForm.match(/(?<mantissa>\d+\.\d*E[+-])(?<exponent>\d*)$/i)

	return `${sign}${mantissa}${exponent.padStart(exponentiaLength, "0")}`
}

function main() {
	const scientificNotation = convertNumberToExponentialForm(input, 4, 2)
	console.log(scientificNotation)
}

main()