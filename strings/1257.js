//// READING FILE | STREAMS ////
const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

class LineReader {
	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("node:readline").ReadLine}
	 */
	static createReadLineInterface(path, encoding = "utf8", options = {}) {
		const readStreamOptions = {
			...options,
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

	/** @param { import("node:readline").ReadLine } readLineInterface */
	static open(readLineInterface) {
		let EOF = false

		const nextLineGenerator = (async function* () {
			for await (const line of readLineInterface)
				yield line
		})()

		readLineInterface.once("close", () => { EOF = true })

		return {
			hasNextLine: () => !EOF,
			nextLine: async (/** @type {unknown} */ fn) => {
				const { value } = (await nextLineGenerator.next())
				return (typeof fn === "function") ? fn(value) : value
			},
			close: () => readLineInterface.close()
		}
	}

	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 */
	static create(path, encoding) {
		const RLI = LineReader.createReadLineInterface(path, encoding)
		return LineReader.open(RLI)
	}
}


async function main() {
	const output = []

	const PATH = "/dev/stdin"
	const ENCODING = "utf8"
	const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase()

	const lineReader = LineReader.create(PATH, ENCODING)
	// const nextLine = lineReaderInstance.nextLine.bind(undefined, (line = "") => line)

	const numTestCases = Number.parseInt((await lineReader.nextLine()), 10)

	for (let testCaseIndex = 0; testCaseIndex < numTestCases; testCaseIndex += 1) {
		let hash = 0
		const numElements = Number.parseInt((await lineReader.nextLine()), 10)

		for (let elementIndex = 0; elementIndex < numElements; elementIndex += 1) {
			const word = await lineReader.nextLine()

			for (let charIndex = 0; charIndex < word.length; charIndex += 1) {
				const alphabeticCharacter = word.charAt(charIndex)
				const relativeToAlphabetCharIndex = ALPHABET.indexOf(alphabeticCharacter)

				if (relativeToAlphabetCharIndex === -1) // Error!
					throw new Error(`[${alphabeticCharacter}] is not a valid alpha-character!`)

				// Valor = (Posição no alfabeto) + (Elemento de entrada) + (Posição do elemento)
				hash += relativeToAlphabetCharIndex + elementIndex + charIndex
			}
		}

		output.push(hash)
	}

	// Closing ReadableStrema to prevent unknow errors
	lineReader.close()
	console.log(output.join("\n"))
}

main()
