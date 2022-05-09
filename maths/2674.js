const { readFileSync } = require("fs")

const nums = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map(num => Number.parseInt(num, 10))

function isPrime(/** @type {number}*/ num) {
	if (num <= 1) return false
	if (num == 2) return true
	if (num % 2 == 0) return false

	const boundary = Math.floor(Math.sqrt(num))

	for (let i = 3; i <= boundary; i += 2) if (num % i === 0) return false
	return true
}

function main() {
	const responses = []

	for (const num of nums) {
		if (isNaN(num)) break

		if (isPrime(num) == true) {
			if (num.toString(10).search(/[014689]/) == -1)
				responses.push("Super")
			else responses.push("Primo")
		}
		else responses.push("Nada")
	}

	console.log(responses.join("\n"))
}

main()