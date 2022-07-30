//// READING FILE | STREAMS ////

const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

const PATH = "/dev/stdin"
const ENCODING = "utf8"

/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */
function createReadLineInterface(path, encoding) {
	return createInterface({
		input: createReadStream(path, encoding),
		crlfDelay: Infinity,
		terminal: false
	})
}

const RLI = createReadLineInterface(PATH, ENCODING)

/** @param {import("readline").Interface} readLineInterface */
const processLineByLine = function (readLineInterface) {
	let EOF = false

	const nextLineGenerator = (async function* () {
		for await (const line of readLineInterface) yield line
		EOF = true
	})()

	return {
		hasNextLine: () => !EOF,
		nextLine: async (fn) => {
			const { value } = (await nextLineGenerator.next())
			return (typeof fn === "function") ? fn(value) : value
		}
	}
}

//// UTILS ////

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

//// GRANIZO CLASS ////

class Granizo {
	static #memo = {}

	/**
	 * Returns the max value of the given sequence initialized for the given `h`
	 * @param {number} h The initial value of the granizo's sequence
	 */
	static max(h) {
		// If the maximum value of the sequence already calculated, then return it
		if (Reflect.has(Granizo.#memo, h)) return Reflect.get(Granizo.#memo, h)

		const H = h
		let maximum = 1

		while (h != 1) {
			// hn = { ½ x hn-1 se hn-1 é par;
			// hn = { 3 x hn-1 + 1 se hn-1 é ímpar.
			// The biggest value in sequence always will be an even number
			if (h > maximum) maximum = h

			if (isEven(h)) { h /= 2 }
			else if (isOdd(h)) { h = 3 * h + 1 }

			if (Reflect.has(Granizo.#memo, h)) {
				maximum = Math.max(maximum, Reflect.get(Granizo.#memo, h))
				break
			}
		}

		return (Reflect.set(Granizo.#memo, H, maximum), Reflect.get(Granizo.#memo, H))
	}

	// static get memo() { return Granizo.#memo }
}

//// MAIN ////

async function main() {
	const output = []
	const readLineInstance = processLineByLine(RLI)
	const readLine = readLineInstance.nextLine.bind(undefined, (n = "") => Number.parseInt(n, 10))

	while (readLineInstance.hasNextLine()) {
		const H = await readLine()

		if (H === 0) break
		else if (1 <= H && H <= 500) output.push(Granizo.max(H))
		else continue
	}

	console.log(output.join("\n"))
}

main()