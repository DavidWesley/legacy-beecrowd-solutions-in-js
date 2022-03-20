const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function SimpleCurrencyFormater(lang, currencyCode) {
	return new Intl.NumberFormat(lang, {
		currency: currencyCode,
		style: "currency",
		currencyDisplay: "symbol",
		useGrouping: true,
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	})
}

function main() {
	const currenciesValues = []
	const currencyFormaterInstance = SimpleCurrencyFormater("en-US", "USD")

	while (input.length > 0) {
		const integerPart = Number.parseInt(input.shift(), 10)
		const fractionPart = Number.parseInt(input.shift(), 10) * 1e-2

		if (isNaN(integerPart) || isNaN(fractionPart)) break

		const resolvedNum = integerPart + fractionPart
		const formattedCurrencyText = currencyFormaterInstance.format(resolvedNum)

		currenciesValues.push(formattedCurrencyText)
	}

	console.log(currenciesValues.join("\n"))
}

main()