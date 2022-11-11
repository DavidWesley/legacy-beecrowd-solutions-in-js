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

/** @typedef {[string, number, number, number]} reindeerType */

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)
	const numCases = Number.parseInt(await lineReader.nextLine(), 10)

	for (let cIndex = 0; cIndex < numCases; cIndex++) {
		output.push(`CENARIO {${cIndex + 1}}`)

		const [N, M] = (await lineReader.nextLine())
			.split(" ", 2)
			.map(value => Number.parseInt(value, 10))

		/**@type {reindeerType[]} */
		const reindeerList = Array(N)

		for (let i = 0; i < reindeerList.length; i++) {
			const [name, weight, age, height] = (await lineReader.nextLine()).split(" ", 4)

			reindeerList[i] = [
				name,
				Number.parseInt(weight, 10),
				Number.parseInt(age, 10),
				Number.parseFloat(height)
			]
		}

		const sortedReindeerList = reindeerList
			.sort(compareReindeer)
			.slice(0, M)
			.map(([name], index) => `${index + 1} - ${name}`)

		Reflect.apply(
			Array.prototype.push,
			output,
			sortedReindeerList
		)
	}

	console.log(output.join("\n"))
}

main()

/**
 * @param { reindeerType } reindeerA
 * @param { reindeerType } reindeerB
 */
function compareReindeer(reindeerA, reindeerB) {
	if (reindeerA[1] !== reindeerB[1]) return reindeerB[1] - reindeerA[1]					// Weights	- DESC
	else if (reindeerA[2] !== reindeerB[2]) return reindeerA[2] - reindeerB[2]				// Ages		- ASC
	else if (reindeerA[3] !== reindeerB[3]) return reindeerA[3] - reindeerB[3]				// Heights	- ASC
	else if (reindeerA[0] !== reindeerB[0]) return reindeerA[0].localeCompare(reindeerB[0])	// Names	- ASC
	else return 0
}
