class QueueNode {
	constructor(data, prev = null, next = null) {
		this.data = data
		this.prev = prev
		this.next = next
	}
}
class Queue {
	#size = 0
	#first = null
	#last = null

	enqueue(data) {
		const newNode = new QueueNode(data, this.#last, null)

		if (this.isEmpty) this.#first = newNode
		else this.#last.next = newNode

		this.#last = newNode
		this.#size++
		return this
	}

	dequeue() {
		const removedItem = this.#first
		this.#first = removedItem.next

		if (!this.isEmpty) this.#size--
		return removedItem.data
	}


	get size() { return this.#size }
	get peek() { return this.#first ?? null }
	get isEmpty() { return this.size === 0 }

	/** @param {Array<any> | Generator<any, any, any>} arr */
	static fromArray(arr) {
		const queue = new Queue()
		for (const data of arr) queue.enqueue(data)
		return queue
	}
}

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const size of input) {
		if (size === "0") break

		const deck = Queue.fromArray(range(1, +size, 1))
		const [discardedCards, reaming] = discardCards(deck)

		const messageCards = {
			discarded: `cards: ${discardedCards.join(", ")}`,
			remaing: `Remaining card: ${reaming}`
		}

		responses.push(messageCards.discarded, messageCards.remaing)
	}

	console.log(responses.join("\n"))
}

/**
 * @param {number} start The start of the range.
 * @param {number} stop The stop of the range.
 * @param {number} step The value to increment or decrement by.
 */
function* range(start = 0, stop, step = 1) {
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

	return [discardedCardsArray, deck.peek.data]
}

main()