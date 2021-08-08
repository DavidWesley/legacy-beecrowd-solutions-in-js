const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split("\n")

const isNegative = (num = 0) => Number(num) < 0

function replaceValuesFromArrayTo(newValue, condition = Function(), targetArray = []) {
	return targetArray.map((value) => {
		if (condition(value)) return newValue
		else return value
	})
}

function main() {
	const responses = []

	const arrayLength = 10
	const nums = input.splice(0, arrayLength).map(Number)

	const condition = (target) => isNegative(target) || target === 0

	const vector = replaceValuesFromArrayTo(1, condition, nums)

	for (const index in vector) {
		const vectorValue = vector[index]
		responses.push(`X[${index}] = ${vectorValue}`)
	}

	console.log(responses.join("\n"))
}

main()
