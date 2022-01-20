const { createReadStream } = require("fs")
const { createInterface } = require("readline")

const PATH = "/dev/stdin"
const ENCODING = "ascii"

/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */

function createReadLineInterface(path, encoding) {
	return createInterface({
		input: createReadStream(path, encoding),
		crlfDelay: Infinity,
		terminal: false
	})
}

const RL = createReadLineInterface(PATH, ENCODING)

const nextLine = (function () {
	const nextLineGen = (async function* () {
		for await (const line of RL) {
			yield line
		}
	})()

	return async () => (await nextLineGen.next()).value
})()

async function main() {
	const output = []

	/** @type {Map<string, { count: number }>} */
	const trees = new Map()

	// @ts-ignore
	let repeatTimes = Number.parseInt(await nextLine(), 10)
	// @ts-ignore
	// eslint-disable-next-line no-unused-vars
	let unusedBlankLine = await nextLine() // blank line

	while (repeatTimes--) {
		let tree = ""
		let total = 0

		// eslint-disable-next-line no-constant-condition
		while (true) {

			tree = await nextLine() || ""

			if (tree == "" || tree == undefined) {
				if (tree == undefined) repeatTimes = 0
				break
			}

			if (trees.has(tree)) trees.get(tree).count += 1
			else trees.set(tree, { count: 1 })

			total += 1
		}

		const organizedTrees =
			trees.size > 0
				? [...trees.entries()]
					.sort(([treeA], [treeB]) => treeA.localeCompare(treeB, "en-US"))
					.map(([treeName, { count }]) => `${treeName} ${((1e2 * count) / total).toFixed(4)}`)
					.join("\n")
				: ""

		trees.clear()

		if (repeatTimes === 0) output.push(organizedTrees)
		else if (organizedTrees.length > 0) output.push(organizedTrees, "")
		else output.push("")
	}

	console.log(output.join("\n"))
}

main()
