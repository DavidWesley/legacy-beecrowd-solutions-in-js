const { readFileSync } = require("fs")
const [input] = readFileSync("/dev/stdin", "utf8").split("\n")

function convertNumberToExponentialForm(number, precision, exponentiaLength = 0) {
	const sign = (s) => s ? "-" : "+" // Transforming BUG into Feature

	const exponentialForm = new Intl.NumberFormat("en-US", {
		notation: "scientific",
		signDisplay: "always",
		style: "decimal",
		minimumFractionDigits: precision,
		maximumFractionDigits: precision,
		useGrouping: false,
	}).format(number)

	const { mantissa, exponent, signalExpoent } = exponentialForm
		.match(/(?<mantissa>[+-]\d+\.\d*E)(?<signalExpoent>[+-]*)(?<exponent>\d*)$/i)
		.groups

	return `${mantissa}${sign(signalExpoent)}${exponent.padStart(exponentiaLength, "0")}`
}

function main() {
	const scientificNotation = convertNumberToExponentialForm(input, 4, 2)
	console.log(scientificNotation)
}

main()