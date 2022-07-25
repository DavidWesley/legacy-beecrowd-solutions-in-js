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

const readLine = (function () {
	const nextLineGenerator = (async function* () {
		for await (const line of RLI) yield line
	})()

	return async () => (await nextLineGenerator.next()).value
})()

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
		if (Reflect.has(Granizo.#memo, h))
			return Reflect.get(Granizo.#memo, h)

		const H = h
		let maxValueInSequence = 1

		// hn = { ½ x hn-1 se hn-1 é par;
		// hn = { 3 x hn-1 + 1 se hn-1 é ímpar.
		while (h != 1) {
			// The biggest value in sequence always will be an even number
			if (h > maxValueInSequence) maxValueInSequence = h

			if (isEven(h)) h /= 2
			else if (isOdd(h)) h = 3 * h + 1

			if (Reflect.has(Granizo.#memo, h)) {
				maxValueInSequence = Math.max(maxValueInSequence, Reflect.get(Granizo.#memo, h))
				break
			}
		}

		Reflect.set(Granizo.#memo, H, maxValueInSequence)
		return Reflect.get(Granizo.#memo, H)
	}

	// static get memo() { return Granizo.#memo }
}

//// MAIN ////

async function main() {
	const responses = []

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const line = /** @type {string}*/ (await readLine())
		const h = Number.parseInt(line, 10)

		if (h === 0) break
		else if (1 <= h && h <= 500) responses.push(Granizo.max(h))
		else continue
	}

	console.log(responses.join("\n"))
}

main()