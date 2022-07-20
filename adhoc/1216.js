const { readFileSync } = require("node:fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

function average(/** @type {number[]} */[...values]) {
	return values.reduce((sum, value) => sum + value, 0) / values.length
}

function main() {
	const values = []

	for (const line of lines) {
		if (line == "") break // EOFile Condition
		const value = Number.parseInt(line, 10)
		if (Number.isNaN(value)) continue
		else values.push(value)
	}

	console.log(average(values).toFixed(1))
}

main()