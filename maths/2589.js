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
		// For execution security reasons, do not change this object
		const readStreamOptions = {
			encoding: encoding,
			flags: "r",
			emitClose: true,
			autoClose: true // critical
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
	 * @param {boolean} split To split spaces into line
	 */
	static create(path, encoding, split = false) {
		let EOF = false
		let RLI = LineReader.createReadLineInterface(path, encoding)

		const nextLine = async (fn) => {
			if (EOF) return undefined

			const { value } = await RLI[Symbol.asyncIterator]().next()

			if (split) {
				value = value.split(/\s+/)
			}

			return (typeof fn === "function") ? fn(value) : value
		}

		RLI.once("close", () => { EOF = true })

		return {
			hasNextLine: () => !EOF,
			nextLine: nextLine,
			close: () => RLI.close()
		}
	}
}

//// CONSTANTS ////

const BIGGER_CONSECUTIVE_PRIMES_DISTANCES_MAP = Object.freeze({
	2: 0,
	3: 1,
	5: 2,
	11: 4,
	29: 6,
	97: 8,
	127: 14,
	541: 18,
	907: 20,
	1_151: 22,
	1_361: 34,
	9_587: 36,
	15_727: 44,
	19_661: 52,
	31_469: 72,
	156_007: 86,
	360_749: 96,
	370_373: 112,
	492_227: 114,
	1_349_651: 118,
	1_357_333: 132,
	2_010_881: 148,
	4_652_507: 154,
	17_051_887: 180,
	20_831_533: 210,
	47_326_913: 220,
	122_164_969: 222,
	189_695_893: 234,
	191_913_031: 248,
	387_096_383: 250,
	436_273_291: 282,
	1_000_000_001: 282
})

const PRIMES = Object.keys(BIGGER_CONSECUTIVE_PRIMES_DISTANCES_MAP).map(value => Number.parseInt(value, 10))

//// BINARY SEARCH ////

/**
 * Return 0 <= i <= array.length such that !pred(array[i - 1]) && pred(array[i]).
 * @param {Array<number>} arr
 * @param {(number) => boolean} predicate
 */
function binarySearch(arr, predicate) {
	let min = -1
	let max = arr.length
	while (1 + min < max) {
		const mid = min + ((max - min) >> 1)
		if (predicate(arr[mid])) {
			max = mid
		} else {
			min = mid
		}
	}
	return max
}

/**
 * Return i such that array[i - 1] <= item < array[i].
 * @param {Array<number>} arr
 * @param {number} item
 */
function upperBound(arr, item) {
	return binarySearch(arr, (value) => item < value)
}

/**
 * Returns the largest distance between consecutive prime numbers from 1 up to N.
 *
 * `NOTE`: The value is limited to 1 billion.
 *
 * @param {number} n - The upper limit to search for consecutive prime numbers.
 * @returns {number} - The largest distance between consecutive prime numbers.
 */
function findBiggestDistanceBetweenConsecutivePrimesUpToNum(n) {
	// Find the index of the largest prime number that is less than or equal to N.
	const index = upperBound(PRIMES, n) - 1;

	// Get the largest distance between consecutive prime numbers up to that index.
	const prime = PRIMES[index];
	return BIGGER_CONSECUTIVE_PRIMES_DISTANCES_MAP[prime];
}

//// MAIN ////

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"
	const lineReader = LineReader.create(PATH, ENCODING, false)

	const helper = (line = "") => Number.parseInt(line, 10)
	const nextLine = lineReader.nextLine.bind(null, helper)

	const output = []

	while (lineReader.hasNextLine()) {
		const N = await nextLine()

		if (isNaN(N)) break // EOF
		else output.push(findBiggestDistanceBetweenConsecutivePrimesUpToNum(N))
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()