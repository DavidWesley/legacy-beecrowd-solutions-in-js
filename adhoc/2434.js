const { readFileSync } = require("fs")
const [days, openingBalance, ...transations] = readFileSync("/dev/stdin", "utf8").split(/\s/)

function getMinimunSaleFromHistory(/** @type {number[]} */[...values], initialValue = 0) {
	for (var index = 0, sale = initialValue, minSaleValueOnHistory = initialValue; index < values.length; index++) {
		sale += values[index]
		minSaleValueOnHistory = sale < minSaleValueOnHistory ? sale : minSaleValueOnHistory
	}

	return minSaleValueOnHistory
}

function main() {
	const transationsValues = transations.slice(0, +days).map(num => Number.parseInt(num, 10))
	const minimunSaleValueOnHistory = getMinimunSaleFromHistory(transationsValues, +openingBalance)

	console.log(minimunSaleValueOnHistory)
}

main()