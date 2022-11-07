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

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const rest = (num, mod = 1) => Number(num) % mod

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	while (lineReader.hasNextLine()) {
		const [N, M] = (await lineReader.nextLine())
			.split(" ", 2)
			.map(value => Number.parseInt(value, 10))

		output.push(`${N} ${M}`)

		if (N === 0 && M === 0) break

		const values = Array(N)

		for (let index = 0; index < N; index++)
			values[index] = Number.parseInt(await lineReader.nextLine(), 10)

		Reflect.apply(
			Array.prototype.push,
			output,
			values.sort((a, b) => compareValuesFromModule(a, b, M))
		)
	}

	console.log(output.join("\n"))
}

main()

function compareValuesFromModule(a = 0, b = 0, mod = 1) {
	// Comparando os restos
	if (rest(a, mod) > rest(b, mod)) return 1
	else if (rest(a, mod) < rest(b, mod)) return -1

	// Comparando as paridades (Impares têm prioridades)
	if (isOdd(a) && isEven(b)) return -1 // Matendo a prioridade dos numeros impares
	else if (isEven(a) && isOdd(b)) return 1 // Invertendo a posição para manter os impares na frente

	// Comparando os impares (maiores na frente)
	if (isOdd(a) && isOdd(b)) return b - a // Os impares seguirão una ordem descrecente

	// Comparando os pares (menores na frente)
	if (isEven(a) && isEven(b)) return a - b // Os pares seguirão uma ordem crescente

	return 0 // resultado padrão
}
