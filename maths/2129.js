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

// Initialize values of last non-zero
// digit of numbers from 0 to 9
const D = [1, 1, 2, 6, 4, 2, 2, 4, 2, 8]

/**
 * Javascript program to find last non-zero digit in n!
 *
 * See the logic code [explanation](https://www.geeksforgeeks.org/last-non-zero-digit-factorial/) to a better understanding.
 *
 * Or consult the [complete proof](https://math.stackexchange.com/questions/130352/last-non-zero-digit-of-a-factorial)
 * @param {number} n
 */
function lastNon0DigitFactorial(n) {
	if (n < 10) return D[n]

	if ((Math.floor(n / 10) % 10) % 2 == 0)
		return (6 * lastNon0DigitFactorial(Math.floor(n / 5)) * D[n % 10]) % 10
	else
		return (4 * lastNon0DigitFactorial(Math.floor(n / 5)) * D[n % 10]) % 10
}

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => Number.parseInt(line, 10)
	const nextLine = lineReader.nextLine.bind(lineReader, helper)

	const memo = new Map()

	for (let i = 1; lineReader.hasNextLine(); i++) {
		const N = await nextLine()
		if (Number.isNaN(N)) break // EOF
		if (memo.has(N) === false) memo.set(N, lastNon0DigitFactorial(N))

		output.push(`Instancia ${i}`, memo.get(N), "")
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
