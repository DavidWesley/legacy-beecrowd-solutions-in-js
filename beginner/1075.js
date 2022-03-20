const { readFileSync } = require("fs")
const targetNumber = +readFileSync("/dev/stdin", "utf8").split("\n").shift()

function createInterval(min = 0, max = min, step = 2) {
	step = step >= 2 ? step : 2
	const size = Math.ceil((max - min + 1) / step)

	return Array.from({ length: size }, (_, i) => min + step * i)
}

function returnListFromRest(targetNum = 1, rest = 0, maxLimimitValue = targetNum) {
	rest = Math.abs(rest)

	if (rest > targetNum) return []
	else return createInterval(rest, maxLimimitValue, targetNum)
}

function main() {
	const rest = 2
	const max = 1e4
	const responses = returnListFromRest(targetNumber, rest, max)

	console.log(responses.join("\n"))
}

main()
