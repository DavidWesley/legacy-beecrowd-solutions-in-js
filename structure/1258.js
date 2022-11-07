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

/** @typedef {{ color: string; size: string; name: string }} shirtPropsType */

/**
 * @param {shirtPropsType} shirtA
 * @param {shirtPropsType} shirtB
 */
function shirtCompare(shirtA, shirtB) {
	const classifier = {
		sizes: { P: 0, M: 1, G: 2 },
		colours: { branco: 0, vermelho: 1 }
	}

	const coloursOrder = classifier.colours[shirtA.color] - classifier.colours[shirtB.color]
	const namesOrder = shirtA.name.localeCompare(shirtB.name, "pt-BR")
	const sizesOrder = classifier.sizes[shirtA.size] - classifier.sizes[shirtB.size]

	if (coloursOrder !== 0) return coloursOrder
	else if (sizesOrder !== 0) return sizesOrder
	else if (namesOrder !== 0) return namesOrder
	return 0
}

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	while (lineReader.hasNextLine()) {
		const N = Number.parseInt(await lineReader.nextLine(), 10)
		if (N === 0) break

		const /** @type {shirtPropsType[]} */ shirts = Array(N)

		for (let index = 0; index < N; index++) {
			const playerName = await lineReader.nextLine()
			const [shirtColor, shirtSize] = (await lineReader.nextLine()).split(" ", 2)

			shirts[index] = { color: shirtColor, size: shirtSize, name: playerName }
		}

		output.push(
			shirts
				.sort(shirtCompare)
				.map(({ name, size, color }) => `${color} ${size} ${name}`)
				.join("\n")
		)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n\n"))
}

main()
