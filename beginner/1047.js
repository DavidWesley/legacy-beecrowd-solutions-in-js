const { readFileSync } = require("fs")
const [startHour, startMin, endHour, endMin] = readFileSync("/dev/stdin", "utf8")
	.split(" ")
	.slice(0, 4)
	.map((time) => Number.parseInt(time, 10))

function getDifferenceBetweenHoursAndMinutes(start = { hours: 0, minutes: 0 }, end = start) {
	this.HOURS_IN_DAY = 24
	this.MINS_IN_HOUR = 60

	if (end.minutes > )

	// if (end > init) return end - init
	// else return this.HOURS_IN_DAY + end - init
}

function main() {

	const start = { hours: startHour, minutes: startMin }
	const end = { hours: endHour, minutes: endMin }

	const difference = getDifferenceBetweenHoursAndMinutes(start, end)
	console.log(`O JOGO DUROU ${difference} HORA(S)`)
}

main()


// 7 10 8 9
// O JOGO DUROU 0 HORA(S) E 59 MINUTO(S)

