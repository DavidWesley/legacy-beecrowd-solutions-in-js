const { readFileSync } = require("fs")
const inputs = readFileSync("/dev/stdin", "utf8").split("\n")

const numTestCases = Number.parseInt(inputs.shift())

const cases = inputs.splice(0, numTestCases).map((pair) => {
	return pair.split(" ").map((num) => Number.parseInt(num))
})

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function sumPA(start, size, step = 1) {
	const end = start + step * size
	return ((start + end) * (size - 1)) / 2
}

function sumOfConsecutivesOddNumbers(targetNum, qtyOfConsecNums = 1) {
	targetNum = isOdd(targetNum) ? targetNum : targetNum + 1
	const constant = sumPA(0, qtyOfConsecNums, 2)

	return targetNum * qtyOfConsecNums + constant
}

function main() {
	const responses = []

	for (const [startValue, repeat] of cases) {
		const sum = sumOfConsecutivesOddNumbers(startValue, repeat)
		responses.push(sum)
	}

	console.log(responses.join("\n"))
}

main()
