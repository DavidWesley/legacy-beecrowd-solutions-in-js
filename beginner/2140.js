const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))

/**
 * @template U
 * @param {Array.<U>} set
 * @param {number} k
 * @returns {Array.<U[]>}
 */

function combinations(set, k) {
	if (k > set.length || k <= 0) return []
	if (k === set.length) return [set]
	if (k === 1) return set.map((x) => [x])

	return set.reduce((p, c, i) => {
		combinations(set.slice(i + 1), k - 1)
			.forEach((tailArray) => p.push([c].concat(tailArray)), undefined)

		return p
	}, [])
}

function main() {
	const BANK_NOTES = [2, 5, 10, 20, 50, 100]
	const possibleDoubleNotesSumList = combinations(BANK_NOTES, 2).map(([n1, n2]) => n1 + n2)

	const responses = new Array()

	for (const [noteA, noteB] of input)
		if (noteA == 0 && noteB == 0) break
		else responses.push(possibleDoubleNotesSumList.includes(noteB - noteA) ? "possible" : "impossible")

	console.log(responses.join("\n"))
}

main()
