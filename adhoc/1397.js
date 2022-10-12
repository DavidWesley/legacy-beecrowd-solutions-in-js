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

		if (Boolean(line) === false || line === "0") break

		const N = Number.parseInt(line, 10)
		const placar = { pA: 0, pB: 0 }

		for (let i = 0; i < N; i += 1) {
			const [A, B] = (await lineReader.nextLine())
				.split(" ", 2)
				.map(value => Number.parseInt(value, 10))

			if (A > B) { placar.pA += 1 }
			else if (B > A) { placar.pB += 1 }
		}

		output.push(`${placar.pA} ${placar.pB}`)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
