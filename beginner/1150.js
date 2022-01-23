const { readFileSync } = require("fs")
const [X, ...ZList] = readFileSync("/dev/stdin", "utf8").split("\n")

function findMinimalSequenceLenToSumIsEqualTarget(a, target = Math.abs(a)) {
	if (a > target) return 0
	const sum = (n) => (n * (n - 1 + 2 * a)) / 2

	for (var count = 1; ; count++) if (sum(count) > target) return count
}

function main() {
	const Z = ZList.find((z) => +z > +X)
	const repetitions = findMinimalSequenceLenToSumIsEqualTarget(+X, +Z)

	console.log(repetitions)
}

main()
