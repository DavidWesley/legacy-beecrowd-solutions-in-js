const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const integers = input.splice(0, input.indexOf("0")).map((num) => Number.parseInt(num))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

function sumPA(start, size, step = 1) {
	const end = start + step * size
	return ((start + end) * (size - 1)) / 2
}

function sumOfConsecutivesEvenNumbers(targetNum, qtyOfConsecNums = 1) {
	targetNum = isEven(targetNum) ? targetNum : targetNum + 1
	const constant = sumPA(0, qtyOfConsecNums, 2)

	return targetNum * qtyOfConsecNums + constant
}

function main() {
	const responses = []

	for (const integer of integers) {
		const sum = sumOfConsecutivesEvenNumbers(integer, 5)
		responses.push(sum)
	}

	console.log(responses.join("\n"))
}

main()
