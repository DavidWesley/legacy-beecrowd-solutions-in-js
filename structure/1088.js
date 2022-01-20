const { readFileSync } = require("fs")

const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

/** @typedef { (number[]) & { swaps?: 0 }} MergeSortArrayType */

/**
 * @param {MergeSortArrayType} left
 * @param {MergeSortArrayType} right
 */

function merge(left, right) {
	const merged = /** @type {MergeSortArrayType} */ ([])
	merged.swaps = 0

	let i = 0, j = 0

	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) {
			merged.push(left[i++])
			merged.swaps += j
		} else {
			merged.push(right[j++])
		}
	}

	merged.swaps += j * (left.length - i)

	while (i < left.length) merged.push(left[i++])
	while (j < right.length) merged.push(right[j++])

	return merged
}

/** @param {MergeSortArrayType} list */

function mergeSort(list) {
	if (list.length <= 1) return (list.swaps = 0, list)

	const middle = Math.floor(list.length / 2)

	const left = mergeSort(list.slice(0, middle))
	const right = mergeSort(list.slice(middle))
	const merged = merge(left, right)

	// Total inversions = left subarray swaps + right subarray swaps + merge swaps
	merged.swaps += left.swaps + right.swaps

	return merged
}

function main() {
	const responses = []

	for (const line of lines) {
		if (line[0] == 0) break

		const size = line[0]
		const values = line.slice(1, 1 + size)

		const inversions = mergeSort(values).swaps

		responses.push(isEven(inversions) ? "Carlos" : "Marcelo")
	}

	console.log(responses.join("\n"))
}

main()