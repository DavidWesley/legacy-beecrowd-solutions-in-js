//// READING FILE | STREAMS ////
const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

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
	const output = []
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const lineReader = LineReader.create(PATH, ENCODING)

	while (lineReader.hasNextLine()) {
		const line = await lineReader.nextLine()
		if (Boolean(line) === false) break // EOFile Condition

		let countAvailableVisitors = 0
		const [N, min, max] = line
			.split(" ", 3)
			.map(value => Number.parseInt(value, 10))

		for (let index = 0; index < N; index += 1) {
			const visitorHeight = Number.parseInt(await lineReader.nextLine(), 10)
			if (min <= visitorHeight && visitorHeight <= max) countAvailableVisitors += 1
		}

		output.push(countAvailableVisitors)
	}

	if (lineReader.hasNextLine()) lineReader.close()
	console.log(output.join("\n"))
}

main()
