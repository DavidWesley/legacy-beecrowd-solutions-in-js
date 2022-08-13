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
		input: createReadStream(path, { encoding }),
		crlfDelay: Infinity,
		terminal: false
	})
}

/** @param {import("readline").Interface} readLineInterface */
const processLineByLine = function (readLineInterface) {
	let EOF = false

	const nextLineGenerator = (async function* () {
		for await (const line of readLineInterface) { yield line }
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

//// CONVERT NUM FROM A BASE TO DECIMAL ////

/** @param {string} base */
function validateBase(base) {
	if (base.length < 2) return false

	const signalList = ["+", "-"]
	const spacesList = [" ", "\f", "\n", "\t", "\r", "\v"]

	if ([...signalList, ...spacesList].some((v) => base.includes(v)))
		return false

	for (let index = 0; index < base.length; index += 1)
		if (base.includes(base[index], index + 1))
			return false

	return true
}

/**
 * @param {string} str
 * @param {string} base
 * @param {number} mod
 * @returns {number}
 */
function atoi(str, base, mod = Number.POSITIVE_INFINITY) {
	let sign = 1
	let index = 0
	let number = 0

	// ! Unnecessary in this context
	// if (validateBase(base) === false)
	// 	return 0

	while (str[index] === "-" || str[index] === "+")
		if (str[index++] === "-")
			sign *= -1

	while (base.includes(str[index]))
		number = (
			(((number % mod) * (base.length % mod)) % mod) +
			(((base.indexOf(str[index++]) % mod) * (sign % mod)) % mod)
		) % mod

	return number
}

//// MAIN ////

async function main() {
	const output = []
	const RLI = createReadLineInterface(PATH, ENCODING)
	const readLineInstance = processLineByLine(RLI)

	const MOD = Math.pow(10, 9) + 7
	const ALPHABET_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	while (readLineInstance.hasNextLine()) {
		const str = await readLineInstance.nextLine()
		if (Boolean(str) === false) break // EOF

		output.push(atoi(str, ALPHABET_BASE, MOD))
	}

	console.log(output.join("\n"))
}

main()
