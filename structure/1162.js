const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {Array<number>} arr */
function bubbleSortSwapCounter(arr) {
	let n = arr.length
	let isSorted = false
	let swaps = 0

	while (!isSorted) {
		isSorted = true
		for (let i = 0; i < n - 1; i++) {
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
				isSorted = false
				swaps += 1
			}
		}
	}

	return swaps
}

function main() {
	const responses = []

	for (let i = 0; i < +numCases; i++) {
		const size = lines[2 * i]
		const wagons = lines[2 * i + 1]
			.split(" ", +size)
			.map(Number.parseFloat)

		const swaps = bubbleSortSwapCounter(wagons)

		responses.push(`Optimal train swapping takes ${swaps} swaps.`)
	}

	console.log(responses.join("\n"))
}

main()