//// READING FILE | STREAMS ////
const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

const PATH = "/dev/stdin"
const ENCODING = "utf8"

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

/** @param {import("readline").Interface} readLineInterface */
const processLineByLine = function (readLineInterface) {
	let EOF = false

	const nextLineGenerator = (async function* () {
		for await (const line of readLineInterface) yield line
		EOF = true
	})()

	return {
		hasNextLine: () => !EOF,
		nextLine: async (fn) => {
			const { value } = (await nextLineGenerator.next())
			return (typeof fn === "function") ? fn(value) : value
		}
	}
}


async function main() {
	const output = []

	const RLI = createReadLineInterface(PATH, ENCODING)
	const readLineInstance = processLineByLine(RLI)

	/** @type {Map<string, { count: number }>} */
	const trees = new Map()
	const numCases = await readLineInstance.nextLine(Number.parseFloat)
	await readLineInstance.nextLine() // Blank line

	for (let repeats = numCases; repeats > 0; repeats -= 1) {
		let total = 0

		while (readLineInstance.hasNextLine()) {
			let tree = await readLineInstance.nextLine()
			if (!tree) break

			if (trees.has(tree)) trees.get(tree).count += 1
			else trees.set(tree, { count: 1 })

			total += 1
		}

		const organizedTrees = trees.size > 0
			? Array
				.from(trees.entries())
				.sort(([treeA], [treeB]) => treeA.localeCompare(treeB, "en-US"))
				.map(([treeName, { count }]) => `${treeName} ${((1e2 * count) / total).toFixed(4)}`)
			: []

		// Restart the tree map to next loop iteration
		trees.clear()

		Reflect.apply(Array.prototype.push, output, organizedTrees)
		if (repeats !== 1) output.push("")
	}

	console.log(output.join("\n"))
}

main()
