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

	const numTestCases = Number.parseInt(await lineReader.nextLine(), 10)

	for (let i = 0; i < numTestCases && lineReader.hasNextLine(); i++) {
		const T = Number.parseInt(await lineReader.nextLine(), 10)
		const dangerousCompoundFormulaList = new Array(T)
		for (let index = 0; index < T; index++)
			dangerousCompoundFormulaList[index] = await lineReader.nextLine()

		const regex = new RegExp(`(${dangerousCompoundFormulaList.join("|")})([^a-z0-9]+?|$)`)

		const U = Number.parseInt(await lineReader.nextLine(), 10)
		const evaluatedCompoundFormulaStatusList = new Array(U)
		for (let index = 0; index < U; index++)
			evaluatedCompoundFormulaStatusList[index] = regex.test(await lineReader.nextLine())
				? "Abortar"
				: "Prossiga"

		output.push(evaluatedCompoundFormulaStatusList.join("\n"))
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n\n"))
}

main()
