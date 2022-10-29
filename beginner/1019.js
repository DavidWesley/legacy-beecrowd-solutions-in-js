const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

function formatTimeDurationToParts(duration = 0) {
	const hours = Math.floor(duration / 3600)
	const minutes = Math.floor(duration / 60) % 60
	const seconds = duration % 60

	return [hours, minutes, seconds]
}

console.log(formatTimeDurationToParts(input).join(":"))
