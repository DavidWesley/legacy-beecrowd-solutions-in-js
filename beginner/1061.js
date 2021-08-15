const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").match(/(\d{1,2})/g).map(value => Number.parseInt(value))

console.log(input)

const NOW = new Date() //=
const YEAR = NOW.getUTCFullYear() //=
const MONTH = NOW.getUTCMonth() //=

let dates = []

while (input.length > 0) {
	let [day, hour, min, sec] = input.splice(0, 4)

	day
	hour
	min
	sec

	let dt = new Date(YEAR, MONTH, day, hour, min, sec) //=

	dates.push(dt)
}

let time = dates.reduce((acc, cur) => cur - acc, 0) //=

// let dateProperties = [getDay, getHour, getMinutes, getSeconds]
let solution = new Date(time) //=

solution.getUTCDay() //=
solution.getUTCHours() //=
solution.getUTCMinutes() //=
solution.getUTCSeconds() //=






function main() {
	const responses = []
	console.log(responses.join('\n'))
}

main()