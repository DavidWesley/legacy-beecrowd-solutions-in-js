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

	const helper = (line = "") => line.split(" ", 60 + 1).map(value => Number.parseInt(value, 10))
	const nextLine = lineReader.nextLine.bind(undefined, helper)

	const [I] = await nextLine() // Numbers of Instances
	const sets = new Array(1e4)

	for (let i = 1; i <= I; i++) {
		const [N] = await nextLine() // Numbers of Sets

		for (let n = 1; n <= N; n++) {
			const [size, ...values] = await nextLine()
			const arr = new Array(size).fill(0)

			for (let m = 1; m <= size; m++)
				arr[values[m - 1]] = 1

			sets[n - 1] = arr
		}

		const [Q] = await nextLine() // Numbers of queries

		for (let q = 1; q <= Q; q++) {
			const [code, X, Y] = await nextLine()
			const setA = sets[X - 1]
			const setB = sets[Y - 1]

			// 1 X Y: Retorna a quantidade de elementos distintos da intersecção entre o conjunto X com o Y.
			// 2 X Y: Retorna a quantidade de elementos distintos da união entre o conjunto X com o Y.
			switch (code) {
				case 1: output.push(intersection(setA, setB).length); break
				case 2: output.push(union(setA, setB).length); break
			}
		}
	}

	sets.length = 0	// Forced cleanup of the set list

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()

/**
 * Bitmask-Like union algorithm
 * @param {Array<boolean>} setA
 * @param {Array<boolean>} setB
 */
function union(setA, setB) {
	let sA, sB
	const arr = []

	setA.length >= setB.length
		? (sA = setA, sB = setB)
		: (sA = setB, sB = setA)

	for (let i = 0; i < sA.length; i++)
		if (sA[i] || sB[i])
			arr.push(i)

	return arr
}

/**
 * Bitmask-Like intersection algorithm
 * @param {Array<boolean>} setA
 * @param {Array<boolean>} setB
 */
function intersection(setA, setB) {
	let sA, sB
	const arr = []

	setA.length >= setB.length
		? (sA = setA, sB = setB)
		: (sA = setB, sB = setA)

	for (let i = 0; i < sB.length; i++)
		if (sA[i] && sB[i])
			arr.push(i)

	return arr
}
