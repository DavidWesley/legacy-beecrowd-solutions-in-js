const { readFileSync } = require("node:fs")
const [numCases, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {any[]} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
	if (arr.length - 1 >= Math.max(i, j)) {
		[arr[i], arr[j]] = [arr[j], arr[i]]
	}
}

/** @param {Array<number>} arr */
function bubbleSortSwapCounter(arr) {
	let isSorted = false
	let swaps = 0

	while (!isSorted) {
		isSorted = true
		for (let i = 1; i < arr.length; i++) {
			if (arr[i - 1] > arr[i]) {
				swap(arr, i - 1, i)
				isSorted = false
				swaps += 1
			}
		}
	}

	return swaps
}

function main() {
	const output = []

	for (let i = 0; i < Number.parseInt(numCases, 10); i++) {
		const wagons = input[2 * i + 1]
			.split(" ", Number.parseInt(input[2 * i], 10))
			.map(value => Number.parseInt(value, 10))

		const swaps = bubbleSortSwapCounter(wagons)

		output.push(`Optimal train swapping takes ${swaps} swaps.`)
	}

	console.log(output.join("\n"))
}

main()
