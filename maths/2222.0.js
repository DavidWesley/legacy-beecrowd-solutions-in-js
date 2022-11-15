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

//// SETS ////
/**
 * @template T
 * @extends Set<T>
 */
class MySet extends Set {
	/**
	 * @param {Iterable<T> | readonly T[] | null} [values]
	 */
	constructor(values = null) {
		super(values)
	}

	/**
	 * @template U
	 * @param {Set<U> | MySet<U>} set
	 * @param {Set<U> | MySet<U>} subset
	 */
	static isSuperset(set, subset) {
		for (const elem of subset)
			if (set.has(elem) === false)
				return false

		return true
	}

	/**
	 * @template U
	 * @param {Set<U> | MySet<U>} setA
	 * @param {Set<U> | MySet<U>} setB
	 */
	static union(setA, setB) {
		const _union = new MySet(setA)
		for (const elem of setB)
			_union.add(elem)

		return _union
	}

	/**
	 * @template U
	 * @param {Set<U> | MySet<U>} setA
	 * @param {Set<U> | MySet<U>} setB
	 */
	static intersection(setA, setB) {
		const _intersection = new MySet()
		for (const elem of setB)
			if (setA.has(elem))
				_intersection.add(elem)

		return _intersection
	}

	/**
	 * @template U
	 * @param {Set<U> | MySet<U>} setA
	 * @param {Set<U> | MySet<U>} setB
	 */
	static symetricDifference(setA, setB) {
		const _diff = new MySet(setA)
		for (const elem of setB)
			if (_diff.has(elem)) _diff.delete(elem)
			else _diff.add(elem)

		return _diff
	}

	/**
	 * @template U
	 * @param {Set<U> | MySet<U>} setA
	 * @param {Set<U> | MySet<U>} setB
	 */
	static difference(setA, setB) {
		const _diff = new MySet(setA)
		for (const elem of setB)
			_diff.delete(elem)

		return _diff
	}
}

//// MAIN ////
async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => line.split(" ", 60 + 1).map(value => Number.parseInt(value, 10))
	const nextLine = lineReader.nextLine.bind(undefined, helper)

	const [I] = await nextLine() // Numbers of Instances

	/** @type {Map<number, MySet<number>>} */
	const sets = new Map()

	for (let i = 1; i <= I; i++) {
		const [N] = await nextLine() // Number of Sets

		for (let n = 1; n <= N; n++) {
			const set = new MySet()
			const [size, ...values] = await nextLine()

			for (let m = 0; m < size; m++)
				set.add(values[m])

			sets.set(n, new MySet(set))
		}

		const [Q] = await nextLine() // Numbers of queries

		for (let q = 1; q <= Q; q++) {
			const [C, X, Y] = await nextLine()

			const setA = sets.get(X)
			const setB = sets.get(Y)

			// 1 X Y: Retorna a quantidade de elementos distintos da intersecção entre o conjunto X com o Y.
			// 2 X Y: Retorna a quantidade de elementos distintos da união entre o conjunto X com o Y.
			switch (C) {
				case 1: output.push(MySet.intersection(setA, setB).size); break
				case 2: output.push(MySet.union(setA, setB).size); break
			}
		}

		sets.clear()
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
