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


//// FUNCTIONS ////


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


//// PRIMES ////

class Primes {
	static #PRIMES_STEPS_ARR = [
		2, 3, 5, 11, 29, 97, 127, 541, 907, 1151, 1361, 9587, 15727,
		19661, 31469, 156007, 360749, 370373, 492227, 1349651, 1357333,
		2010881, 4652507, 17051887, 20831533, 47326913, 122164969, 189695893,
		191913031, 387096383, 436273291, Math.pow(10, 9) + 1
	]

	static #BIGGERS_CONSUCUTIVES_PRIMES_DISTANCES_MAP = new Map([
		[2, 0], [3, 1], [5, 2], [11, 4], [29, 6], [97, 8], [127, 14], [541, 18],
		[907, 20], [1151, 22], [1361, 34], [9587, 36], [15727, 44],
		[19661, 52], [31469, 72], [156007, 86], [360749, 96], [370373, 112],
		[492227, 114], [1349651, 118], [1357333, 132], [2010881, 148], [4652507, 154],
		[17051887, 180], [20831533, 210], [47326913, 220], [122164969, 222],
		[189695893, 234], [191913031, 248], [387096383, 250], [436273291, 282], [Math.pow(10, 9) + 1, 282]
	])

	/**
	 * retorna a maior distância entre primos consecutivos, de 1 a N.
	 *
	 * `OBS`: O Valor está limitado ao 1 Bilhão.
	 * @param {number} num
	 */
	static findBiggestDistanceBetweenConsecutivePrimesUpToNum(num) {
		const index = upperBound(Primes.#PRIMES_STEPS_ARR, num) - 1
		const key = Primes.#PRIMES_STEPS_ARR[index]
		return Primes.#BIGGERS_CONSUCUTIVES_PRIMES_DISTANCES_MAP.get(key)
	}
}


//// MAIN ////


async function main() {
	const output = []
	const readLineInstance = processLineByLine(RLI)
	const readLine = readLineInstance.nextLine.bind(undefined, (n = "") => Number.parseInt(n, 10))

	while (readLineInstance.hasNextLine()) {
		const num = await readLine()

		if (isNaN(num)) break // EOFile Condition
		else output.push(Primes.findBiggestDistanceBetweenConsecutivePrimesUpToNum(num))
	}

	console.log(output.join("\n"))
}

main()
