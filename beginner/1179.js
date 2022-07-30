const { readFileSync } = require("fs")
const nums = readFileSync("/dev/stdin", "utf8").split("\n", 15).map(num => Number.parseInt(num, 10))

function main() {
	const odds = []
	const evens = []

	const LIMIT = 5
	const responses = []

	nums.forEach(num => {
		num % 2 === 0 ? evens.push(num) : odds.push(num)

		if (evens.length === LIMIT) responses.push(...evens.splice(0, LIMIT).map((num, index) => `par[${index}] = ${num}`))
		if (odds.length === LIMIT) responses.push(...odds.splice(0, LIMIT).map((num, index) => `impar[${index}] = ${num}`))
	})

	if (odds.length) responses.push(...odds.slice(0).map((num, index) => `impar[${index}] = ${num}`))
	if (evens.length) responses.push(...evens.slice(0).map((num, index) => `par[${index}] = ${num}`))

	console.log(responses.join("\n"))
}

main()