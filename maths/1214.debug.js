const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/dev/stdin", "utf8").split('\n')

const sumValues = (/** @type {number[]} */[...values], initialValue = 0) => values.reduce((acc, cur) => acc + cur, initialValue)
const mediaValues = (/** @type {number[]} */[...values]) => sumValues(values) / values.length

function percetageGradesAboveAveragePercentil(notes = [], precision = null) {
	const media = mediaValues(notes)
	const percentil = notes.filter(note => note > media).length / notes.length * 1e2

	return `${precision ? percentil.toFixed(precision) : percentil}%`
}

function main() {
	const responses = cases.slice(0, +numTestCases).map(cs => {
		const [quantity, ...notes] = cs.split(' ').map(value => Number.parseInt(value, 10))
		return percetageGradesAboveAveragePercentil(notes.slice(0, quantity), 3)
	})

	console.log(`${responses.join('\n')} `)
}

main()