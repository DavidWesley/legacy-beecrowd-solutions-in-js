const { readFileSync } = require("fs")
const [numCases, ...cases] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/g)
	.map((value) => Number.parseInt(value, 10))

const teamLen = 3
const totalTeams = cases
	.slice(0, numCases)
	.reduce((sum, value) => sum + Math.trunc(value / teamLen), 0)

const totalStudents = totalTeams * teamLen

console.log(totalStudents)