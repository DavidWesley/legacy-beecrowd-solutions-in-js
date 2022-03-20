const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => Number.parseInt(line, 10))

function main() {
	const responses = []

	for (const num of input)
		if (isNaN(num)) break // EOFile Condition
		else responses.push(getNumDigitsFromSmallestMultipleOfNThatAreMadeUpOf1(num))

	console.log(responses.join("\n"))
}

main()

function getNumDigitsFromSmallestMultipleOfNThatAreMadeUpOf1(n) {
	let ans = 1, cc = 1

	if (n % 2 == 0 || n % 5 == 0) return cc

	while (ans % n != 0) {
		ans = ((ans % n) * (10 % n) + (1 % n)) % n
		cc += 1
	}

	return cc
}