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
		const sizes = await lineReader.nextLine()
		if (Boolean(sizes) === false) break // EOFile Condition

		const [N, M] = sizes
			.split(" ", 2)
			.map(value => Number.parseInt(value, 10))

		const positions = {
			analogimons: { row: 0, col: 0 },
			hunter: { row: 0, col: 0 }
		}

		for (let i = 0; i < N; i += 1) {
			const line = (await lineReader.nextLine()).split(" ", M)

			for (let j = 0; j < M; j += 1) {
				if (line[j] === "1") { // Hunter
					positions.hunter.row = i
					positions.hunter.col = j
				}
				else if (line[j] === "2") { // Analogimon
					positions.analogimons.row = i
					positions.analogimons.col = j
				}
			}
		}

		const dist =
			Math.abs(positions.analogimons.col - positions.hunter.col) +
			Math.abs(positions.analogimons.row - positions.hunter.row)

		output.push(dist)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
