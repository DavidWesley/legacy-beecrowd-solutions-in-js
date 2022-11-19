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
			for await (const line of RLI) {
				yield line
			}
		})()

		RLI.once("close", () => {
			EOF = true
		})

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

//// MAIN ////
async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "ascii"
	const RLI = LineReader.createReadLineInterface(PATH, ENCODING)

	let innerHTMLBody = false

	RLI.on("line", (line) => {
		if (line.includes("<body>")) innerHTMLBody = true
		if (line.includes("</body>")) innerHTMLBody = false

		if (innerHTMLBody === true && line.includes("<body>") === false)
			console.log(line)
	})
}

main()
