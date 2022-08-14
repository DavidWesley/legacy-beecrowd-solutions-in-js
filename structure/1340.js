//// ESTRUTURAS DE DADOS ////

class PriorityQueue {
	#queue = new Array()

	/**
	 * @param {number} item
	 * @param {number} priority
	 */
	enqueue(item, priority) {
		this.#queue.push({ item, priority })
		this.#queue.sort((a, b) => b.priority - a.priority)
	}

	dequeue() { return this.#queue.shift() }

	isEmpty() { return this.size() === 0 }

	/** Returns the number of elements in the queue */
	size() { return this.#queue.length }

	clear() { this.#queue.length = 0 }
}

class Queue {
	#queue = new Array()
	enqueue(item) { this.#queue.push(item) }

	dequeue() { return this.#queue.shift() }

	isEmpty() { return this.size() === 0 }

	size() { return this.#queue.length }

	clear() { this.#queue.length = 0 }
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
}


const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 2).map(value => Number.parseInt(value, 10)))


function main() {
	const output = []

	const stack = new Stack()
	const queue = new Queue()
	const priorityQueue = new PriorityQueue()

	for (let i = 0; i < input.length;) {
		const size = input[i][0]
		const structNames = ["stack", "queue", "priority queue"]

		if (Number.isNaN(size))
			break

		for (let j = 1; j <= size; j++) {
			const [command, value] = input[i + j]

			switch (command) {
				case 1: {
					stack.push(value)
					queue.enqueue(value)
					priorityQueue.enqueue(value, value)
					break
				}
				case 2: {
					if (stack.pop() !== value) delete structNames[0]
					if (queue.dequeue() !== value) delete structNames[1]
					if (priorityQueue.dequeue().item !== value) delete structNames[2]
					break
				}
			}
		}

		const selectedStructNames = structNames.filter(Boolean)

		if (selectedStructNames.length == 0) output.push("impossible")
		else if (selectedStructNames.length === 1) output.push(selectedStructNames.at(0))
		else output.push("not sure")

		i += size + 1

		stack.clear()
		queue.clear()
		priorityQueue.clear()
	}

	console.log(output.join("\n"))
}

main()
