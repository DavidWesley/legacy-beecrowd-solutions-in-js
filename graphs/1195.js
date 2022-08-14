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


class BinaryTree {
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

		return this
	}

	static get values() {
		/**
		 * @param {BinaryTree} tree
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
		 * @param {BinaryTree} tree
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
		 * @param {BinaryTree} tree
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

const { readFileSync } = require("fs")
const [[numCases], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2 * 1000 + 1)
	.map((line) => line.split(" ", 500).map(value => Number.parseInt(value, 10)))


function main() {
	const output = []

	for (let i = 0; i < numCases; i += 1) {
		const binaryTreee = new BinaryTree()
		const size = input[2 * i][0]
		const values = input[2 * i + 1]

		for (let j = 0; j < size; j += 1)
			binaryTreee.add(values[j])

		output.push(
			`Case ${i + 1}:`,
			`Pre.: ${BinaryTree.values.order.prefix(binaryTreee).join(" ")}`,
			`In..: ${BinaryTree.values.order.infix(binaryTreee).join(" ")}`,
			`Post: ${BinaryTree.values.order.postfix(binaryTreee).join(" ")}`,
			""
		)
	}

	console.log(output.join("\n"))
}

main()