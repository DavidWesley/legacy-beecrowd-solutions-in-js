const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2).map(value => Number.parseInt(value, 10)))

const TIME_UNITS = {
	get MILLISECOND() { return 1 },
	get SECOND() { return 1000 * this.MILLISECOND },
	get MINUTE() { return 60 * this.SECOND },
	get HOUR() { return 60 * this.MINUTE },
	get DAY() { return 24 * this.HOUR },
	get WEEK() { return 7 * this.DAY },
	get MONTH() { return 30 * this.DAY },
	get YEAR() { return 365 * this.DAY }
	//...
}


function main() {
	const output = []

	const YEAR = 2016
	const CHRISTMAS_DATE = new Date(YEAR, 11, 25)

	for (const [M, D] of input) {
		const date = new Date(YEAR, M - 1, D)
		const days = Math.trunc((CHRISTMAS_DATE.getTime() - date.getTime()) / TIME_UNITS.DAY)

		if (days === 0) output.push("E natal!")
		else if (days === 1) output.push("E vespera de natal!")
		else if (days < 0) output.push("Ja passou!")
		else if (days > 0) output.push(`Faltam ${days} dias para o natal!`)
	}

	console.log(output.join("\n"))
}

main()
