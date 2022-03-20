const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const isNegative = (num) => Math.sign(num) === -1

const sumValues = (/** @type {number[]} */[...values], initialValue = 0) => values.reduce((acc, cur) => acc + cur, initialValue)
const mediaValues = (/** @type {number[]} */[...values]) => sumValues(values) / values.length

function main() {
	const brokenAtIndex = input.findIndex(isNegative)
	const validAges = input.slice(0, brokenAtIndex).map(age => Number.parseInt(age, 10))

	const media = mediaValues(validAges)

	console.log(media.toFixed(2))
}

main()
