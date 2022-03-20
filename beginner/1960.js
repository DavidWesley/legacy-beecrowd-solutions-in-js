const { readFileSync } = require("fs")
const [numeral] = readFileSync("/dev/stdin", "utf8").split("\n")

const toRomanNumeral = num => {
	const lookup = new Map([
		["M", 1000],
		["CM", 900],
		["D", 500],
		["CD", 400],
		["C", 100],
		["XC", 90],
		["L", 50],
		["XL", 40],
		["X", 10],
		["IX", 9],
		["V", 5],
		["IV", 4],
		["I", 1],
	])

	return [...lookup].reduce((symbol, [key, value]) => {
		symbol += `${key}`.repeat(Math.floor(num / value))
		num = num % value

		return symbol
	}, "")
}

function main() {
	const romanFormat = toRomanNumeral(+numeral)
	console.log(romanFormat)
}

main()