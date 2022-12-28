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

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const N = Number.parseInt(await lineReader.nextLine(), 10)

	for (let index = 1; lineReader.hasNextLine() && index <= N; index++) {
		await lineReader.nextLine() // skipping blank line
		const input = await lineReader.nextLine()
		const code = await lineReader.nextLine()

		const decodedText = BrainfuckInterpreter(code, input)

		output.push(
			`Instancia ${index}`,
			decodedText,
			""
		)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()

/*
┌─────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Instrução  │                                                             Descrição                                                              │
├─────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│      >      │ Incrementa o ponteiro.                                                                                                             │
│      <      │ Decrementa o ponteiro.                                                                                                             │
│      +      │ Incrementa o byte na posição indicada pelo ponteiro.                                                                               │
│      -      │ Decrementa o byte na posição indicada pelo ponteiro.                                                                               │
│      .      │ Imprime o valor do byte na posição indicada pelo ponteiro.                                                                         │
│      ,      │ Lê um byte e armazena na posição indicada pelo ponteiro. Se não houver nada que possa ser lido (entrada acabou), armazenar zero.   │
│      [      │ Início do loop: Executa o código delimitado até que o byte na posição indicada pelo ponteiro seja igual a zero.                    │
│      ]      │ Fim do loop.                                                                                                                       │
│      #      │ Imprime os valores das 10 primeiras posições do vetor.                                                                             │
└─────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/


/**
 * Inspired By Code of Harley Jackson
 * @param {string} code
 */
function BrainfuckInterpreter(code, input = "") {
	const buff = new Uint8Array(new SharedArrayBuffer(3e4))
	const loops = new Array(0)
	const chars = new Array(0)

	// programIndex | buffIndex | inputIndex
	let [pIndex, bIndex, iIndex] = [0, 0, 0]

	// Reading code and starting some configurations
	for (pIndex = 0; pIndex < code.length; pIndex++) {
		if (code[pIndex] === "[") loops.push({ start: pIndex, end: null })

		else if (code[pIndex] === "]") {
			for (let l = loops.length - 1; l >= 0; l--) {
				if (loops[l].end == null) {
					loops[l].end = pIndex
					break
				}
			}
		}
	}

	// Interpreting BrianFuck Code
	for (pIndex = 0; pIndex < code.length; pIndex++) {
		switch (code[pIndex]) {
			case ">": bIndex = (buff.length + bIndex + 1) % buff.length; break
			case "<": bIndex = (buff.length + bIndex - 1) % buff.length; break

			case "+": Atomics.add(buff, bIndex, 1); break
			case "-": Atomics.sub(buff, bIndex, 1); break

			case ".": chars.push(buff[bIndex]); break
			case ",": Atomics.store(buff, bIndex, input.charCodeAt(iIndex++) || 0); break

			case "[": if (buff[bIndex] === 0) pIndex = loops.find((loop) => pIndex === loop.start).end; break
			case "]": if (buff[bIndex] !== 0) pIndex = loops.find((loop) => pIndex === loop.end).start; break

			case "#": chars.push(...buff.slice(0, 11)); break

			default: break
		}
	}

	return String.fromCharCode(...chars)
}
