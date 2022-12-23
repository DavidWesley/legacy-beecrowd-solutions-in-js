const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

//// STACK ////

class Stack {
	#items
	constructor() { this.#items = [] }
	push(element) { this.#items.push(element) }
	pop() { return this.#items.pop() }
	toArray() { return this.#items }
	isEmpty() { return this.size == 0 }

	get size() { return this.#items.length }
	get peek() { return this.#items[this.size - 1] }

	/** @param {Array<any> | Generator<any, any, any>} arr */
	static fromArray(arr) {
		const stack = new Stack()
		for (const item of arr) stack.push(item)
		return stack
	}
}

/**
 * @param {number} start The start of the range.
 * @param {number} stop The stop of the range.
 * @param {number} step The value to increment or decrement by.
 */
function* Range(start = 0, stop, step = 1) {
	if (isNaN(stop)) {
		// one param defined
		[stop, start] = [start, 0]
	}

	for (let value = start; step > 0 ? value < stop : value > stop; value += step)
		yield value
}

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

	while (lineReader.hasNextLine()) {
		const N = Number.parseInt(await lineReader.nextLine(), 10)  // wagons quantity

		if (N === 0) break

		while (lineReader.hasNextLine()) {
			const wagons = (await lineReader.nextLine())
				.split(" ", N)
				.reverse()

			if (wagons.at(0) === "0") break

			const expected = Stack.fromArray(wagons)

			const stationA = Stack.fromArray(Range(N, 0, -1))
			const stationB = new Stack()
			const stationC = new Stack()

			while (expected.isEmpty() === false) {
				if (stationA.peek === expected.peek) { stationB.push(stationA.pop()); expected.pop() }
				else if (stationC.peek === expected.peek) { stationB.push(stationC.pop()); expected.pop() }
				else if (stationA.isEmpty() === false) { stationC.push(stationA.pop()) }
				else break
			}

			output.push(stationB.size === N ? "Yes" : "No")
		}

		output.push("")
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
