const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n').shift()

function formatDataByDaysNums(numDays = 0) {
	const Y = Number.parseInt(String(numDays / 365), 10)
	const M = Number.parseInt(String((numDays - (Y * 365)) / 30), 10)
	const D = Number.parseInt(String((numDays % 365) % 30), 10)

	return [D, M, Y]
}

function main() {
	const ageInDays = Number.parseInt(input, 10)
	const [days, months, years] = formatDataByDaysNums(ageInDays)
	const print = `${years} ano(s) ${months} mes(s) ${days} dia(s)\n`

	console.log(print)
}

main()