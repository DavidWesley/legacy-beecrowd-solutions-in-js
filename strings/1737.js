const { createReadStream } = require("fs")
const { createInterface } = require("readline")

//// READING FILE | STREAMS ////
class LineReader {
	/**
	 * @param {import("fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("readline").ReadLine}
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
	 * @param {import("fs").PathLike} path
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

	while (lineReader.hasNextLine()) {
		const N = Number.parseInt(await lineReader.nextLine(), 10)
		if (N === 0 || Number.isNaN(N)) break

		const hash = new Map()
		const arr = new Array(N)

		for (let n = 0; n < N; n++) {
			arr[n] = await lineReader.nextLine()
		}

		const text = arr.join("")

		for (let i = 0; i < text.length - 1; i++) {
			const digraph = text.substr(i, 2)

			if (hash.has(digraph)) hash.get(digraph).count++
			else hash.set(digraph, { count: 1 })
		}

		const total = Array
			.from(hash.values(), ({ count }) => count)
			.reduce((sum, value) => sum + value, 0)

		const top5BiggerFrequencies = Array
			.from(hash.entries(), ([digraph, { count }]) => [digraph, count, (count / total).toFixed(6)])
			.sort(([dghA, countA], [dghB, countB]) => (countA !== countB) ? countB - countA : dghA.localeCompare(dghB))
			.map((v) => v.join(" "))
			.slice(0, 5)

		output.push(...top5BiggerFrequencies, "")
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
