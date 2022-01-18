const { readFileSync } = require("fs")
const input = readFileSync('/dev/stdin', "utf8").split("\n")

const stopAtIndex = input.indexOf("0 0")

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
	const changesList = input.slice(0, stopAtIndex).map((pairNote) => {
		const [N, M] = pairNote.split(" ")
		return +M - +N
	})

	const bankNotes = [2, 5, 10, 20, 50, 100]
	const possibleDoubleNotesSumList = combinations(bankNotes, 2).reduce((list, [n1, n2]) => (list.push(n1 + n2), list), [])

	const responses = changesList.map((change) => {
		return possibleDoubleNotesSumList.includes(change) ? "possible" : "impossible"
	})

	console.log(responses.join("\n"))
}

main()
