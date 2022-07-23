const { readFileSync } = require("node:fs")

const [numTrees, ...values] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map((value) => Number.parseInt(value, 10))


function main() {
	const trees = values
		.slice(0, numTrees)
		.sort((treeA, treeB) => treeB - treeA)

	let most = trees[0]

	for (let index = 1; index < numTrees; index += 1)
		if (trees[index] > (--most))
			most = trees[index]

	console.log(most + numTrees + 1)
}

main()