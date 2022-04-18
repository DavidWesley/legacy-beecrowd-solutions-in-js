const { readFileSync } = require("fs")
const repeatTimes = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.shift()

const getChristmasMessage = (times = 1) => {
	const DEFAULT_CHRISTMAS_MESSAGE = "Entao eh Natal!"

	return DEFAULT_CHRISTMAS_MESSAGE.replace(/a/g, "a".repeat(times))
}

console.log(getChristmasMessage(Number.parseInt(repeatTimes, 10)))
