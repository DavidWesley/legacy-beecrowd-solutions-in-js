const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")
const pairs = input.map(pair => pair.split(" ").map(num => Number.parseInt(num)))

const isSmaller = (element, index, arr) => !index || arr[index - 1] > element
const isGreater = (element, index, arr) => !index || arr[index - 1] < element

const isIncreasingOrder = ([...numbers]) => numbers.every(isGreater)
const isDecreasingOrder = ([...numbers]) => numbers.every(isSmaller)

// function isSameOrSmaller(element, index, arr) {
// 	const prev = arr[index === 0 ? index : index - 1]
// 	return prev >= element
// }

// function isSameOrGreater(element, index, arr) {
// 	const prev = arr[index === 0 ? index : index - 1]
// 	return prev <= element
// }

function main() {
	const responses = []

	for (const pair of pairs) {
		if (isIncreasingOrder(pair)) responses.push("Crescente")
		else if (isDecreasingOrder(pair)) responses.push("Decrescente") //=
		else break
	}

	console.log(responses.join("\n"))
}

main()