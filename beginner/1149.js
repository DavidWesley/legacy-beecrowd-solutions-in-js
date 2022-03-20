const { readFileSync } = require("fs")
const inputs = readFileSync("/dev/stdin", "utf8").split("\n")

const inputValues = inputs.map((input) => input.split(" ").map((num) => Number.parseInt(num))
)

const isPositive = (num = 0) => Number(num) > 0

function sumPA(start, size, step = 1) {
	const end = start + step * size
	return ((start + end) * (size - 1)) / 2
}

function sumFromPA(A = 0, N = 1) {
	return A + sumPA(A, N)
}

function main() {
	const responses = []

	for (const values of inputValues) {
		const A = values.shift()
		const N = values.find(isPositive)
		const sum = sumFromPA(A, N)

		responses.push(sum)
	}

	console.log(responses.join("\n"))
}

main()
