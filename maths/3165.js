const { readFileSync } = require("node:fs")

const [int] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))


/** @param {number} num */
function isPrime(num) {
	if (num <= 1) return false
	if (num == 2) return true
	if (num % 2 == 0) return false

	const boundary = Math.sqrt(num)

	for (let i = 3; i <= boundary; i += 2)
		if (num % i == 0)
			return false

	return true
}

/** @param {number} num */
function getTwinsPrimesNumberUpToGivenNumber(num) {
	if (num < 5) return [null, null]
	if (num % 2 === 0) num--

	const primesList = []

	while (num >= 3) {
		if (isPrime(num)) {
			primesList.push(num)

			if (Math.abs(num - primesList[primesList.length - 2]) == 2) break
		}

		num -= 2
	}

	return primesList.slice(-2).reverse()
}


function main() {
	console.log(
		getTwinsPrimesNumberUpToGivenNumber(int)
			.join(" ")
	)
}

main()