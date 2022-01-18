const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const Integer = (num = '') => Number.parseInt(num, 10)

const [M, N] = input.shift().split(' ').map(Integer)

const dictonary = new Map()

for (let lineIndex = 0; lineIndex < M; lineIndex++) {
	const [word, value] = input.shift().split(' ')
	dictonary.set(word, Integer(value))
}

const responses = []

for (let lineIndex = 0; lineIndex < N; lineIndex++) {
	let line = input.shift()
	const keys = []

	while (line !== '.') {
		keys.push(...line.split(' ').filter(word => dictonary.has(word)))
		line = input.shift()
	}

	const total = keys.reduce((sum, word) => sum + dictonary.get(word), 0)
	responses.push(total)
}

console.log(responses.join("\n"))