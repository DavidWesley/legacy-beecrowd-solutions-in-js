const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function Factorial() {
	const factorialValues = new Map([
		[0, 1n],
		[1, 1n],
	])

	/** @param {number} num */

	function fact(num) {
		let returnedValue = 1
		for (let f = 2; f <= num; f++) returnedValue *= f
		return BigInt(returnedValue)
	}

	/** @param {number} num */

	return function (num) {
		if (!factorialValues.has(num)) factorialValues.set(num, fact(num))
		return factorialValues.get(num)
	}
}

function main() {
	const responses = []

	const MAX_LIMIT_FACTORIAL = 20
	const factorialsPairList = input.map((factorialPair) => factorialPair.split(" ").map((int) => Number.parseInt(int, 10)))

	const factorialListInstance = Factorial()

	for (const [firstFact, secondFact] of factorialsPairList) {
		if (typeof firstFact !== "number" || typeof secondFact !== "number") break // EOFile Condition Verification
		if (Math.max(firstFact, secondFact) > MAX_LIMIT_FACTORIAL) continue // No Greater than 20 Condition verification

		responses.push(
			`${factorialListInstance(firstFact) + factorialListInstance(secondFact)}`
		)
	}

	console.log(responses.join("\n"))
}

main()