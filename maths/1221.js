const { readFileSync } = require("fs")
const [numTestCases, ...numbers] = readFileSync("/dev/stdin", "utf8").split('\n')

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

const isPrime = (/** @type {number}*/ num) => {
	if (isEven(num)) return num === 2

	const boundary = Math.floor(Math.sqrt(num))
	for (let i = 3; i <= boundary; i += 2) if (num % i === 0) return false
	return num >= 3
}

function main() {
	const responses = numbers.slice(0, +numTestCases).map((num) => {
		const n = Number.parseInt(num, 10)
		return isPrime(n) ? "Prime" : "Not Prime"
	})

	console.log(`${responses.join("\n")}`)
}

main()
