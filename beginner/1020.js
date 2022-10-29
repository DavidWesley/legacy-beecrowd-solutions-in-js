const { readFileSync } = require("node:fs")
const [N] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

function formatDateDurationToParts(duration = 0) {
	const years = Math.floor(duration / 365)
	const months = Math.floor((duration % 365) / 30)
	const days = duration % 365 % 30

	return [years, months, days]
}

console.log("%d ano(s)\n%d mes(es)\n%d dia(s)", ...formatDateDurationToParts(N))
