const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

/** @typedef { number[] & { swaps?: 0 }} MergeSortArrayType  */

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
	const output = []

	for (const [size, ...values] of input) {
		if (size === 0) break

		const { swaps } = mergeSort(values.length !== size + 1 ? values.splice(1, size) : values)

		output.push(isEven(swaps) ? "Carlos" : "Marcelo")
	}

	console.log(output.join("\n"))
}

main()
