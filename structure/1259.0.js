const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1e5 + 1)

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

function main() {
	const nums = input
		.splice(0, Number.parseInt(numLines, 10))
		.map(value => Number.parseInt(value, 10))

	const evens = nums.filter(isEven).sort((a, b) => a - b)
	const odds = nums.filter(isOdd).sort((a, b) => b - a)

	console.log(evens.join("\n"))
	console.log(odds.join("\n"))
}

main()
