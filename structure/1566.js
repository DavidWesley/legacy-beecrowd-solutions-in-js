//// READING FILE | STREAMS ////
const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

const PATH = "/dev/stdin"
const ENCODING = "utf8"

/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */
function createReadLineInterface(path, encoding) {
	return createInterface({
		input: createReadStream(path, encoding),
		crlfDelay: Infinity,
		terminal: false
	})
}

/** @param {import("readline").Interface} readLineInterface */
const processLineByLine = function (readLineInterface) {
	let EOF = false

	const nextLineGenerator = (async function* () {
		for await (const line of readLineInterface) yield line
		EOF = true
	})()

	return {
		hasNextLine: () => !EOF,
		nextLine: async (fn) => {
			const { value } = (await nextLineGenerator.next())
			return (typeof fn === "function") ? fn(value) : value
		}
	}
}

async function main() {
	const RLI = createReadLineInterface(PATH, ENCODING)
	const readLineInstance = processLineByLine(RLI)
	const nextLine = readLineInstance.nextLine.bind(undefined, (str = "") => str.split(" ").map(value => Number.parseInt(value, 10)))

	// Número de caso de teste equivalente ao tamanho do array
	// o qual será usado para impressão
	const size = (await nextLine()).shift()

	// Criar um array in memory é mais rápido
	// do que incrementar seu tamanho com o `.push` method
	const output = new Array(size)

	for (let index = 0; index < size; index++) {
		// Desnecessário
		// para otimização pode-se evitar atribuir essa linha a alguma variável
		await nextLine()

		output[index] = await nextLine()
	}

	for (let index = 0; index < size; index++) {
		// Nenhuma implementação hard-coded
		// será mais perfomático que um método de sort nativo
		output[index] = output[index].sort((a, b) => a - b).join(" ")
	}

	console.log(output.join("\n"))
}

main()