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

	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => line.toLowerCase().split(/[\W\b\s_\d]+/gi)
	const nextLine = lineReader.nextLine.bind(lineReader, helper)

	/** @type {Set<string>} */
	const uniqueWordsSet = new Set()

	while (lineReader.hasNextLine()) {
		const words = await nextLine()

		for (const word of words) {
			if (word === "") continue // Filtering empty strings
			uniqueWordsSet.add(word)
		}
	}

	console.log(
		Array
			.from(uniqueWordsSet.values())
			.sort((strA, strB) => strA.localeCompare(strB, "en-US"))
			.join("\n")
	)
}

main()
