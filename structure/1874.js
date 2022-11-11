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

//// MAIN ////
async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => line.split(" ").map(value => Number.parseInt(value, 10))
	const nextLine = lineReader.nextLine.bind(lineReader, helper)

	while (lineReader.hasNextLine()) {
		const [H, P, F] = await nextLine()
		if (H === 0 || P === 0 || F === 0) break

		const stacks = Array(H)
		for (let i = 0; i < stacks.length; i++)
			stacks[i] = await nextLine()

		const treadmill = await nextLine()

		inner:
		for (let position = P - 1; position >= 0; position--) {
			for (let level = H - 1; level >= 0; level--) {
				if (treadmill.length === 0) break inner
				if (stacks[level][position] === 0)
					stacks[level][position] = treadmill.shift()
			}
		}

		Reflect.apply(
			Array.prototype.push,
			output,
			stacks.map(level => level.join(" "))
		)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
