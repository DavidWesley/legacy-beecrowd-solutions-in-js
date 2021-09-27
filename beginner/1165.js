const { readFileSync } = require("fs")
const [numTestCases, ...nums] = readFileSync("/dev/stdin", "utf8").split('\n')

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

const isPrime = (/** @type {number}*/ num) => {
	if (isEven(num)) return num === 2

	const boundary = Math.floor(Math.sqrt(num))
	for (let i = 3; i <= boundary; i += 2) if (num % i === 0) return false
	return num >= 3
}

function main() {
	const numbersList = nums.slice(0, +numTestCases).map(num => Number.parseInt(num, 10))
	const responses = numbersList.map(num => {
		return `${num}${isPrime(num) ? '' : ' nao'} eh primo`
	})

	console.log(`${responses.join('\n')}`)
}

main()