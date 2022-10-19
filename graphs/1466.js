//// REQUIRES ////
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
	get peek() { return this.#first }

	/** @param {Array<any> | Generator<any, any, any>} arr */
	static fromArray(arr) {
		const queue = new Queue()
		for (const data of arr) queue.enqueue(data)
		return queue
	}
}

//// BINARY TREE ////
/**
 * @extends Node<number>
 */
class BinaryTreeNode extends Node {
	/**
	 * @param {number} data
	 * @param {BinaryTreeNode} left
	 * @param {BinaryTreeNode} right
	 */
	constructor(data, left = null, right = null) {
		super(data)
		this.left = BinaryTreeNode.isBinaryTreeNode(left) ? left : null
		this.right = BinaryTreeNode.isBinaryTreeNode(right) ? right : null
	}

	/**
	 * @param {unknown} node
	 */
	static isBinaryTreeNode(node) {
		return node instanceof BinaryTreeNode
	}
}

class BinarySearchTree {
	constructor() { this.root = null }

	/**
	 * @param {number} value
	 */
	add(value) {
		const node = new BinaryTreeNode(value)

		if (this.root === null)
			this.root = node

		for (let current = this.root; current != null;) {
			if (node.value > current.value) {
				if (current.right) current = current.right
				else { current.right = node; break }
			} else if (node.value < current.value) {
				if (current.left) current = current.left
				else { current.left = node; break }
			} else
				break
		}
	}

	/**
	 * search for a node with given data
	 * @param {BinaryTreeNode} node
	 * @param {number} data
	 */
	search(node, data) {
		let current = node

		while (current) {
			if (data < current.value) current = current.left
			else if (data > current.value) current = current.right
			else break
		}

		return current
	}

	static get values() {
		/**
		 * @param {BinarySearchTree} tree
		 * @returns {Array<number>}
		 */
		const infix = (tree) => {
			const result = new Array()
			const traverse = (/** @type {BinaryTreeNode} */ node) => {
				if (node.left) traverse(node.left)
				result.push(node.value)
				if (node.right) traverse(node.right)
			}
			if (BinaryTreeNode.isBinaryTreeNode(tree.root)) traverse(tree.root)
			return result
		}

		/**
		 * @param {BinarySearchTree} tree
		 * @returns {Array<number>}
		 */
		const prefix = (tree) => {
			const result = new Array()
			const traverse = (/** @type {BinaryTreeNode} */ node) => {
				result.push(node.value)
				if (node.left) traverse(node.left)
				if (node.right) traverse(node.right)
			}
			if (BinaryTreeNode.isBinaryTreeNode(tree.root)) traverse(tree.root)
			return result
		}

		/**
		 * @param {BinarySearchTree} tree
		 * @returns {Array<number>}
		 */
		const postfix = (tree) => {
			const result = new Array()
			const traverse = (/** @type {BinaryTreeNode} */ node) => {
				if (node.left) traverse(node.left)
				if (node.right) traverse(node.right)
				result.push(node.value)
			}
			if (BinaryTreeNode.isBinaryTreeNode(tree.root)) traverse(tree.root)
			return result
		}

		return {
			order: { infix, postfix, prefix }
		}
	}
}

//// SEARCHS TREE ////
/**
 * @param {BinaryTreeNode} root
 */
const breadthFirstSearchTree = (root) => {
	if (root === null) return []

	const values = []
	const queue = new Queue().enqueue(root)

	while (!queue.isEmpty()) {
		const node = queue.dequeue()
		values.push(node.value)
		if (node.left !== null) queue.enqueue(node.left)
		if (node.right !== null) queue.enqueue(node.right)
	}

	return values
}


//// MAIN ////
async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const numCases = Number.parseInt(await lineReader.nextLine(), 10)

	for (let i = 0; i < numCases && lineReader.hasNextLine(); i += 1) {
		const bst = new BinarySearchTree()

		const size = Number.parseInt(await lineReader.nextLine(), 10)
		const values = (await lineReader.nextLine())
			.split(" ", size)
			.map(value => Number.parseInt(value, 10))

		for (const value of values)
			bst.add(value)

		output.push(
			`Case ${i + 1}:`,
			`${breadthFirstSearchTree(bst.root).join(" ")}`,
			""
		)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
