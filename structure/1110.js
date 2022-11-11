//// NODE ////
/**
 * @template T
 */
class Node {
	/**
	 * @param {T} data
	 */
	constructor(data) {
		this.value = data
	}
}

//// QUEUE ////
class QueueNode extends Node {
	/**
	 * @param {unknown} data
	 * @param {QueueNode} prev
	 * @param {QueueNode} next
	 */
	constructor(data, prev = null, next = null) {
		super(data)
		this.prev = prev
		this.next = next
	}
}

class Queue {
	#size = 0
	#first = null
	#last = null

	enqueue(data) {
		const node = new QueueNode(data, this.#last, null)

		if (this.isEmpty()) this.#first = node
		else this.#last.next = node

		this.#last = node
		this.#size++
		return this
	}

	dequeue() {
		const item = this.#first
		this.#first = item.next

		if (!this.isEmpty()) this.#size--
		return item.value
	}

	isEmpty() { return this.size === 0 }

	get size() { return this.#size }
	get peek() { return this.#first.value }

	/** @param {Array<any> | Generator<any, any, any>} arr */
	static fromArray(arr) {
		const queue = new Queue()
		for (const data of arr) queue.enqueue(data)
		return queue
	}
}

//// READING FILE | STREAMS ////
const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")
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

//// FUNCTIONS ////

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

	for (
		let value = start;
		step > 0 ? value < stop : value > stop;
		value += step
	) {
		yield value
	}
}

/** @param {Queue} deck */
function discardCards(deck) {
	const discardedCardsArray = []

	while (deck.size > 1) {
		discardedCardsArray.push(deck.dequeue())
		deck.enqueue(deck.dequeue())
	}

	return [discardedCardsArray, deck.peek]
}

//// MAIN ////
async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => Number.parseInt(line, 10)
	const nextLine = lineReader.nextLine.bind(lineReader, helper)

	while (lineReader.hasNextLine()) {
		const size = await nextLine()
		if (size === 0) break

		const deck = Queue.fromArray(Range(1, size, 1))
		const [discardedCards, reamingCard] = discardCards(deck)

		output.push(
			`cards: ${discardedCards.join(", ")}`,
			`Remaining card: ${reamingCard}`
		)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
