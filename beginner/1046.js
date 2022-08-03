const { readFileSync } = require("fs")
const [startHour, endHour] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map((hour) => Number.parseInt(hour, 10))

function getDifferenceBetweenHours(init = 0, end = init) {
	const HOURS_IN_DAY = 24

	if (end > init) return end - init
	else return HOURS_IN_DAY + end - init
}

function main() {
	const difference = getDifferenceBetweenHours(startHour, endHour)
	console.log(`O JOGO DUROU ${difference} HORA(S)`)
}

main()