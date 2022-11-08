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
			autoClose: true,
		}

		return createInterface({
			input: createReadStream(path, readStreamOptions),
			crlfDelay: Infinity,
			terminal: false,
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
			close: () => RLI.close(),
		}
	}
}

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const lineReader = LineReader.create(PATH, ENCODING)

	// Número de caso de teste equivalente ao tamanho do array
	// o qual será usado para impressão
	const size = Number.parseInt(await lineReader.nextLine(), 10)

	// Criar um array in memory é mais rápido
	// do que incrementar seu tamanho com o `.push` method
	const output = new Array(size)

	for (let index = 0; index < size; index++) {
		const N = Number.parseInt(await lineReader.nextLine(), 10)

		output[index] = (await lineReader.nextLine())
			.split(" ", N)
			.map((value) => Number.parseInt(value, 10))
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	for (let index = 0; index < size; index++) {
		// Nenhuma implementação hard-coded
		// será mais performática que um método de sort nativo
		output[index] = output[index].sort((a, b) => a - b).join(" ")
	}

	console.log(output.join("\n"))
}

main()
