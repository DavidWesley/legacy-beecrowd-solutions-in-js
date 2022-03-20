const { readFileSync } = require("fs")

const sizes = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(size => Number.parseInt(size, 10))

function appendTrunkFromTopTree(tree = [], size = 2, from = 0) {
	const until = from + size > tree.length ? tree.length - from : from + size
	return tree.concat(tree.slice(from, until))
}

function createTree(size, sheetsSymbol = "*", separatorSymbol = " ") {
	sheetsSymbol = sheetsSymbol.charAt(0)
	separatorSymbol = separatorSymbol.charAt(0)

	const length = Math.round(size / 2)

	const topTreeArr = Array.from({ length }, (_, rowIndex) => {
		const repeatTimes = rowIndex * 2 + 1
		const sheets = sheetsSymbol.repeat(repeatTimes)
		const separators = separatorSymbol.repeat(Math.floor(length - repeatTimes / 2))

		return `${separators}${sheets}\n`
	})

	const tree = appendTrunkFromTopTree(topTreeArr)
	return tree.join("") // tree
}

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function main() {
	const trees = sizes.reduce((trees, size) => {
		if (isOdd(size)) trees.push(createTree(size))
		return trees
	}, [])

	console.log(trees.join("\n"))
}

main()