const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')[0]

const targetNumber = parseInt(input)

function createInterval(min = 0, max = min, step = 2) {
	step = step >= 2 ? step : 2
	const size = Math.ceil((max - min + 1) / step)
	return Array.from({ length: size }, (_, i) => min + step * i)
}

function returnListFromRest(targetNumber = 1, rest = 0, maxLimimitValue = targetNumber) {
	rest = Math.abs(rest)
	if (rest > targetNumber) return
	return createInterval(rest, maxLimimitValue, targetNumber)
}

function main() {
	const rest = 2
	const max = 1e4
	const responses = returnListFromRest(targetNumber, rest, max)

	console.log(responses.join('\n'))
}

main()
