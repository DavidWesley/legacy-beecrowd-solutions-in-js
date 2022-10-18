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

//// CONVERT NUM FROM A BASE TO DECIMAL ////

/** @param {string} base */
// eslint-disable-next-line no-unused-vars
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
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const MOD = 1e9 + 7
	const ALPHABET_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	while (lineReader.hasNextLine()) {
		const str = await lineReader.nextLine()
		if (Boolean(str) === false) break // EOF

		output.push(atoi(str, ALPHABET_BASE, MOD))
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
