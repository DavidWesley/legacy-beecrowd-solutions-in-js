const TIME_UNITS = {
	get MILLISECOND() { return 1 },
	get SECOND() { return 1000 * this.MILLISECOND },
	get MINUTE() { return 60 * this.SECOND },
	get HOUR() { return 60 * this.MINUTE },
	get DAY() { return 24 * this.HOUR },
	//...
}

const { readFileSync } = require("fs")
const [date1, time1, date2, time2] = readFileSync("/dev/stdin", "utf8").split("\n")

const [D1] = date1.match(/\d+/)
const [D2] = date2.match(/\d+/)

const [H1, M1, S1] = time1.split(" : ")
const [H2, M2, S2] = time2.split(" : ")

const $d = (+D2 - +D1) * TIME_UNITS.DAY
const $h = (+H2 - +H1) * TIME_UNITS.HOUR
const $m = (+M2 - +M1) * TIME_UNITS.MINUTE
const $s = (+S2 - +S1) * TIME_UNITS.SECOND

const resolvedTimeInMilliseconds = $d + $h + $m + $s

const days = Math.floor(resolvedTimeInMilliseconds / TIME_UNITS.DAY)
const hours = Math.floor((resolvedTimeInMilliseconds % TIME_UNITS.DAY) / TIME_UNITS.HOUR)
const minutes = Math.floor((resolvedTimeInMilliseconds % TIME_UNITS.HOUR) / TIME_UNITS.MINUTE)
const seconds = Math.floor((resolvedTimeInMilliseconds % TIME_UNITS.MINUTE) / TIME_UNITS.SECOND)

console.log("%d dia(s)", days)
console.log("%d hora(s)", hours)
console.log("%d minuto(s)", minutes)
console.log("%d segundo(s)", seconds)