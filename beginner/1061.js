const TIME_UNITS = {
	get MILLISECOND() { return 1 },
	get SECOND() { return 1000 * this.MILLISECOND },
	get MINUTE() { return 60 * this.SECOND },
	get HOUR() { return 60 * this.MINUTE },
	get DAY() { return 24 * this.HOUR },
	//...
}

const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")

function main() {
	const [D1, H1, M1, S1, D2, H2, M2, S2] = input
		.match(/\d{1,2}/gs)
		.map(value => Number.parseInt(value, 10))

	const resolvedTimeInMilliseconds =
		TIME_UNITS.DAY * (D2 - D1) +
		TIME_UNITS.HOUR * (H2 - H1) +
		TIME_UNITS.MINUTE * (M2 - M1) +
		TIME_UNITS.SECOND * (S2 - S1)

	const days = Math.floor(resolvedTimeInMilliseconds / TIME_UNITS.DAY)
	const hours = Math.floor((resolvedTimeInMilliseconds % TIME_UNITS.DAY) / TIME_UNITS.HOUR)
	const minutes = Math.floor((resolvedTimeInMilliseconds % TIME_UNITS.HOUR) / TIME_UNITS.MINUTE)
	const seconds = Math.floor((resolvedTimeInMilliseconds % TIME_UNITS.MINUTE) / TIME_UNITS.SECOND)

	console.log("%d dia(s)", days)
	console.log("%d hora(s)", hours)
	console.log("%d minuto(s)", minutes)
	console.log("%d segundo(s)", seconds)
}

main()
