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

//// TRIE ////

class TrieNode {
	/** @param {string} char */
	constructor(char) {
		/** @type {string}*/ this.key = char
		/** @type {TrieNode | null}*/ this.parent = null
		/** @type {Map<string, TrieNode>}*/ this.children = new Map()
		/** @type {boolean}*/ this.end = false

	}
	word() {
		const arr = []
		for (let node = this; node !== null; node = node.parent)
			arr.push(node.key)

		return arr.reverse().join("")
	}
}

class Trie {
	constructor() {
		/** @type {TrieNode}*/ this.root = new TrieNode(null)
	}

	/** @param {string} word */
	insert(word) {
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			const char = word.charAt(i)
			if (node.children.has(char) === false) {
				node.children.set(char, new TrieNode(char))
				node.children.get(char).parent = node
			}

			node = node.children.get(char)

			// finally, we check to see if it's the last word.
			if (i === word.length - 1) { node.end = true }
		}
	}

	/** @param {string} word */
	contains(word) {
		let node = this.root
		for (const char of word) {
			if (node.children.has(char)) node = node.children.get(char)
			else return false
		}

		// we finished going through all the words, but is it a whole word?
		return node.end
	}

	/** @param {string} prefix */
	find(prefix) {
		let node = this.root
		for (const char of prefix)
			if (node.children.has(char)) node = node.children.get(char)
			else return []

		/**
		 * recursive function to find all words in the given node.
		 * @param {TrieNode} node
		 * @param {string[]} arr
		*/
		const recursiveFind = (node, arr) => {
			// base case, if node is at a word, push to output
			if (node.end) arr.unshift(node.word())
			// iterate through each children, call recursive findAllWords
			node.children.forEach(child => { recursiveFind(child, arr) })
		}

		const output = []
		recursiveFind(node, output)
		return output
	}

	/** @param {string} word */
	remove(word) {
		if (Boolean(word) === false) return

		/**
		 * recursively finds and removes a word
		 * @param {TrieNode} node
		 * @param {string} word
		 */
		const recursiveRemove = (node, word) => {
			// check if current node contains the word
			if (node.end && node.word() === word) {
				// check and see if node has children
				// if has children we only want to un-flag the end node that marks end of a word.
				// this way we do not remove words that contain/include supplied word
				if (node.children.size > 0) node.end = false
				// remove word by getting parent and setting children to empty dictionary
				else node.parent.children.clear()

				return true
			}
			// recursively remove word from all children
			node.children.forEach((child) => { recursiveRemove(child, word) })
			return false
		}

		// call remove word on root node
		recursiveRemove(this.root, word)
	}

	// NON-STANDARD UTILS TRIE'S FUNCTIONS //

	/** @param {string} prefix */
	hasChildren(prefix) {
		let node = this.root
		for (const char of prefix)
			if (node.children.has(char)) node = node.children.get(char)
			else return false

		// The prefix query may be a complete (or already inserted) word
		return node.children.size !== 0
	}
}

//// MAIN ////

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	while (lineReader.hasNextLine()) {
		const quantity = Number.parseInt(await lineReader.nextLine(), 10)
		if (quantity === 0) break

		let isGreatSet = true
		const set = new Set()
		const trie = new Trie()

		for (let index = 0; index < quantity; index += 1) {
			const text = await lineReader.nextLine()

			if (isGreatSet) {
				if (set.has(text)) isGreatSet = false
				else if (trie.hasChildren(text)) isGreatSet = false
				else { set.add(text); trie.insert(text) }
			}
		}

		if (isGreatSet) {
			if (set.size !== quantity) { isGreatSet = false }
			else for (const prefix of set) if (trie.hasChildren(prefix)) { isGreatSet = false; break }
		}

		output.push(isGreatSet ? "Conjunto Bom" : "Conjunto Ruim")
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
