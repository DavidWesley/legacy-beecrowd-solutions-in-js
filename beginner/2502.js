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

const RegexesEnum = {
	get numbers() { return /\d+/gi },
	get upperCase() { return /[A-Z]+/ },
	get lowerCase() { return /[a-z]+/ },
}

const Chars = {
	isChar: (str = "") => str.length === 1,
	isDigit: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.numbers, "i").test(char),
	isUppercase: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.upperCase, "").test(char),
	isLowercase: (char = "") => Chars.isChar(char) && RegExp(RegexesEnum.lowerCase, "").test(char),
}

/**
 * @param {string[]} encryptedStrList
 * @param {{first: string, second: string}} cypher
 */

function decryptor(cypher = { first: "", second: "" }) {
	const [normalizedCypherA, normalizedCypherB] = [
		cypher.first,
		cypher.second
	].map((c) => c.toLowerCase().replace(/\W/g, ""))

	const hash = new Map()
	const length = Math.min(normalizedCypherA.length, normalizedCypherB.length)

	for (let index = 0; index < length; index++) {
		const normalizedCypherCharA = normalizedCypherA.charAt(index)
		const normalizedCypherCharB = normalizedCypherB.charAt(index)

		hash.set(normalizedCypherCharA, normalizedCypherCharB)
		hash.set(normalizedCypherCharB, normalizedCypherCharA)
	}

	return (text = "") => {
		return text.replace(/\w/g, (char) => {

			if (hash.has(char.toLowerCase())) {
				const replaced = hash.get(char.toLowerCase())

				// if (Chars.isDigit(char)) return replaced
				// if (Chars.isLowercase(char)) return replaced
				if (Chars.isUppercase(char)) return replaced.toUpperCase()
				else return replaced
			}

			return char
		})
	}
}

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	while (lineReader.hasNextLine()) {
		const [, N = NaN] = (await lineReader.nextLine())
			.split(" ", 2)
			.map(value => Number.parseInt(value, 10))

		if (Number.isNaN(N)) break // EOF

		const cypherA = await lineReader.nextLine()
		const cypherB = await lineReader.nextLine()

		const decryptedMessagesList = new Array(N)
		const decryptorFunctionInstance = decryptor({ first: cypherA, second: cypherB })

		for (let index = 0; index < N; index++)
			decryptedMessagesList[index] = decryptorFunctionInstance(await lineReader.nextLine())

		output.push(decryptedMessagesList.join("\n"), "")
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
