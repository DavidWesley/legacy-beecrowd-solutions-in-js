const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let index = 0; index < input.length; index += 2) {
		const numElements = input[index]
		if (numElements == "0") break

		const suspectList = input[index + 1].split(" ", +numElements)
		const [, secondIndex] = nextBiggestNum(suspectList)

		responses.push(secondIndex + 1)
	}

	console.log(responses.join("\n"))
}

main()

function nextBiggestNum(arr) {
	let [maxIndex, prevIndex] = new Array(2).fill(-1)
	let [max, prev] = new Array(2).fill(Number.NEGATIVE_INFINITY)

	for (let index = 0; index < arr.length; index++) {
		const value = Number(arr[index])

		if (value > max) {
			[prev, max] = [max, value];
			[prevIndex, maxIndex] = [maxIndex, index]
		} else if (value < max && value > prev) {
			[prev, prevIndex] = [value, index]
		}
	}

	return [prev, prevIndex]
}