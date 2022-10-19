//// REQUIRES ////
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

//// CLASSES ////

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

/**
 * @extends Node<number>
 */
class BinaryTreeNode extends Node {
	/**
	 * @param {number} data
	 * @param {BinaryTreeNode | null} left
	 * @param {BinaryTreeNode | null} right
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

//// MAIN ////

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const bst = new BinarySearchTree()

	while (lineReader.hasNextLine()) {
		const line = await lineReader.nextLine()
		if (Boolean(line) === false) break

		const [command, data] = line.split(" ", 2)

		switch (command) {
			case "I": bst.add(data); break
			case "P": output.push(`${data} ${bst.search(bst.root, data) ? "existe" : "nao existe"}`); break
			case "INFIXA": output.push(BinarySearchTree.values.order.infix(bst).join(" ")); break
			case "PREFIXA": output.push(BinarySearchTree.values.order.prefix(bst).join(" ")); break
			case "POSFIXA": output.push(BinarySearchTree.values.order.postfix(bst).join(" ")); break
		}
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
