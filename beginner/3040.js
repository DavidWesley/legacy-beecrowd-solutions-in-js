const { readFileSync } = require("fs")

const [[numCases], ...trees] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(tree => tree
		.split(" ", 3)
		.map(Number.parseFloat)
	)

/**
 * @param {number} height
 * @param {number} thickness
 * @param {number} branches
 * @return {boolean}
 */

const validateTree = (height, thickness, branches) => {
	return (
		(height >= 200 && height <= 300)
		&& (thickness >= 50)
		&& (branches >= 150)
	)
}

function main() {

	const responses = trees
		.slice(0, numCases)
		.map(tree => validateTree(...tree) ? "Sim" : "Nao")

	console.log(responses.join("\n"))
}

main()