const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

//// READING FILE | STREAMS ////
class LineReader {
	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("node:readline").ReadLine}
	 */
	static createReadLineInterface(path, encoding = "utf8") {
		const readStreamOptions = {
			encoding: encoding,
			flags: "r",
			emitClose: true,
			autoClose: true
		}

		return createInterface({
			input: createReadStream(path, readStreamOptions),
			crlfDelay: Infinity,
			terminal: false
		})
	}

	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 */
	static create(path, encoding) {
		const RLI = LineReader.createReadLineInterface(path, encoding)

		let EOF = false

		const nextLineGenerator = (async function* () {
			for await (const line of RLI)
				yield line
		})()

		RLI.once("close", () => { EOF = true })

		return {
			hasNextLine: () => !EOF,
			nextLine: async (/** @type {unknown} */ fn) => {
				const { value } = (await nextLineGenerator.next())
				return (typeof fn === "function") ? fn(value) : value
			},
			close: () => RLI.close()
		}
	}
}

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	/** @type {Map<string, { count: number }>} */
	const trees = new Map()

	let size = Number.parseInt(await lineReader.nextLine(), 10)
	await lineReader.nextLine() // Removing unnecessary blank line

	while (size-- > 0) {
		let total = 0

		while (lineReader.hasNextLine()) {
			const tree = await lineReader.nextLine()

			if (!tree) break

			if (trees.has(tree))
				trees.get(tree).count += 1
			else
				trees.set(tree, { count: 1 })

			total += 1
		}

		const organizedTrees = trees.size > 0
			? Array
				.from(trees.entries())
				.sort(([treeA], [treeB]) => treeA.localeCompare(treeB, "en-US"))
				.map(([treeName, { count }]) => `${treeName} ${((1e2 * count) / total).toFixed(4)}`)
			: []

		trees.clear() // Restart the tree map to next loop iteration
		Reflect.apply(Array.prototype.push, output, organizedTrees)
		output.push("")
	}

	output.pop() // Trim end last new line character
	console.log(output.join("\n"))
}

main()
