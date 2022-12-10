const { readFileSync } = require("node:fs")
const [D, P] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

function calcBirthdayProblemProbability(students = 2, days = 365) {
	if (students <= 1) return 0
	if (students >= days) return 1

	let prob = 1

	for (let s = 1; s < students; s++)
		prob *= (days - s) / days

	return 1 - prob
}

console.log((calcBirthdayProblemProbability(P, D) * 1e2).toFixed(2))
