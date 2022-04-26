// ESTRUTURAS DE DADOS

class PriorityQueueNode {
	constructor(item, priority) {
		this.item = item
		this.priority = priority
	}
}
class PriorityQueue {
	#hasSorted = false
	#queue = /** @type {Array<PriorityQueueNode>} */(new Array())

	/**
	 * @param {number} item
	 * @param {number} priority
	 */
	enqueue(item, priority) {
		this.#hasSorted = false
		this.#queue.push(new PriorityQueueNode(item, priority))
	}

	#sort() {
		this.#queue.sort((a, b) => b.priority - a.priority)
		this.#hasSorted = true
	}

	dequeue() {
		if (this.#hasSorted == false)
			this.#sort()
		return this.#queue.shift()
	}

	isEmpty() { return this.size() === 0 }

	/**
	* Returns the number of elements in the queue
	* @public
	* @returns {number}
	*/
	size() { return this.#queue.length }

	clear() { this.#queue.length = 0 }

	static get className() { return "Priority Queue" }
}

class Queue {
	#queue = new Array()
	enqueue(item) { this.#queue.push(item) }

	dequeue() { return this.#queue.shift() }

	isEmpty() { return this.size() === 0 }

	size() { return this.#queue.length }

	clear() { this.#queue.length = 0 }

	static get className() { return "Queue" }

}

class Stack {
	#items = new Array()
	push(element) { this.#items.push(element) }
	pop() { return this.#items.pop() }

	toArray() { return this.#items }
	isEmpty() { return this.size == 0 }

	clear() { this.#items.length = 0 }

	get size() { return this.#items.length }
	get peek() { return this.#items.at(-1) }

	static get className() { return "Stack" }
}

// Code

const { readFileSync } = require("fs")
const [...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(value => Number.parseInt(value, 10)))

function main() {

	const stack = new Stack()
	const queue = new Queue()
	const priorityQueue = new PriorityQueue()

	const responses = []

	for (let i = 0; i < lines.length;) {
		const [size] = lines[i]
		const structsNames = [Queue.className.toLowerCase(), PriorityQueue.className.toLowerCase(), Stack.className.toLowerCase()]

		if (Number.isNaN(size)) break

		for (let index = 1; index <= size; index++) {
			const [commandCode, value] = lines[i + index]

			if (commandCode === 1) {
				stack.push(value)
				queue.enqueue(value)
				priorityQueue.enqueue(value, value)
			}
			else if (commandCode === 2) {
				if (queue.dequeue() !== value) delete structsNames[0]
				if (priorityQueue.dequeue().item !== value) delete structsNames[1]
				if (stack.pop() !== value) delete structsNames[2]
			}
		}

		const resolved = structsNames.filter(Boolean)

		if (resolved.length == 0) responses.push("impossible")
		else if (resolved.length === 1) responses.push(resolved[0])
		else responses.push("not sure")

		i += size + 1

		stack.clear()
		queue.clear()
		priorityQueue.clear()
	}

	console.log(responses.join("\n"))
}

main()
