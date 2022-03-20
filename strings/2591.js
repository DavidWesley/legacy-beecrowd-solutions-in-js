"use strict"

const { readFileSync } = require("fs")
const [numCases, ...cases] = readFileSync("/dev/stdin", "utf8").split("\n")

function ka(word) {
	const times = word
		.match(/a+/g)
		.slice(0, 2)
		.map(m => m.length)
		.reduce((prod, value) => prod * value, 1)

	return `k${"a".repeat(times)}`
}


function main() {
	const responses = cases.slice(0, +numCases).map(ka)
	console.log(responses.join("\n"))
}

main()