const { readFileSync } = require("node:fs")
const [name, dateA, dateB] = readFileSync("../dev/stdin", "utf8").split("\n", 3)

const Regexes = Object.freeze({
	DatesFormatsTypes: Object.freeze({
		"2D2M4Y": /(?<day>\d{2})[.,\-\\/\s](?<month>\d{2})[.,\-\\/\s](?<year>\d{4})/u,
		"4Y2M2D": /(?<year>\d{4})[.,\-\\/\s](?<month>\d{2})[.,\-\\/\s](?<day>\d{2})/u
	})
})

function extractSimpleDateObjectFromDateString(str, dateFormatType) {
	return Regexes.DatesFormatsTypes[dateFormatType].exec(str).groups || {}
}


function main() {
	const output = []

	const { year: yearA, month: monthA, day: dayA } = extractSimpleDateObjectFromDateString(dateA, "2D2M4Y")
	const { year: yearB, month: monthB, day: dayB } = extractSimpleDateObjectFromDateString(dateB, "2D2M4Y")

	if (monthA === monthB && dayA === dayB)
		output.push("Feliz aniversario!")

	if (monthA > monthB || (monthA === monthB && dayA >= dayB))
		output.push(`Voce tem ${yearA - yearB} anos ${name}.`)
	else
		output.push(`Voce tem ${yearA - yearB - 1} anos ${name}.`)

	console.log(output.join("\n"))
}

main()
