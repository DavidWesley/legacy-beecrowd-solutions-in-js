const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function getSumEvenAndOddsOrderFromDigits(digits = "") {
	const sums = [...digits].reduce(
		(obj, digit, index) => {
			const num = Number.parseInt(digit, 10)
			isOdd(index) ? (obj.oddSum += num) : (obj.evenSum += num)

			return obj
		},
		{ oddSum: 0, evenSum: 0 }
	)

	return Object.values(sums)
}

function getVerifyingDigit(digits = "") {
	const [oddSum1, evenSum1] = getSumEvenAndOddsOrderFromDigits(digits)
	const [oddSum2, evenSum2] = getSumEvenAndOddsOrderFromDigits(`${oddSum1}${evenSum1}`)

	return oddSum2 + evenSum2
}

function main() {
	const responses = []

	for (let curr = input.next(); curr.done == false; curr = input.next()) {
		const N = curr.value
		if (N == "0") break // End of input

		for (let i = 0; i < +N; i++)
			responses.push(getVerifyingDigit(input.next().value || ""))
	}

	console.log(responses.join("\n"))
}

main()