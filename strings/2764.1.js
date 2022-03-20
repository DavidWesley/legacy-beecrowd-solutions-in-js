/**
Leia uma data no formato DD/MM/AA;
Imprima a data no formato MM/DD/AA;
Imprima a data no formato AA/MM/DD;
Imprima a data no formato DD-MM-AA.
*/

/** Funciona apenas com Node 14+ */

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
const dateRegex = /^(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{2,4})$/g

function main() {
	const { groups } = dateRegex.exec(input)

	const [day, month, year] = Object.values(groups).map(value => Number.parseInt(value, 10))

	const date = new Date(year, month - 1, day)


	/** @type {Intl.DateTimeFormatOptions} */

	const options = {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit"
	}

	const dateStringYearFirst = date.toLocaleDateString("ja-JP", options)  // AA/MM/DD
	const dateStringMonthFirst = date.toLocaleDateString("en-US", options)  // MM/DD/AA
	const dateStringSepByHifen = date.toLocaleDateString("es-CL", options)  // DD-MM-AA

	const responses = [
		`${dateStringMonthFirst}`,
		`${dateStringYearFirst}`,
		`${dateStringSepByHifen}`
	]

	console.log(responses.join("\n"))
}

main()