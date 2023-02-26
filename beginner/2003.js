const { createReadStream } = require("fs")
const { createInterface } = require("readline")

//// READING FILE | STREAMS ////
class LineReader {
	/**
	 * @param {import("fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("readline").ReadLine}
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
	 * @param {import("fs").PathLike} path
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

const calcMaximumDelayTime = (hours, minutes) => (hours >= 7) ? ((hours - 7) * 60) + minutes : 0

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => line.split(":", 2).map(value => Number.parseInt(value, 10))
	const nextLine = lineReader.nextLine.bind(null, helper)

	const output = []

	while (lineReader.hasNextLine()) {
		const [hour, min] = await nextLine()
		if (Number.isNaN(hour) || Number.isNaN(min)) break // EOF
		output.push(`Atraso maximo: ${calcMaximumDelayTime(hour, min)}`)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
