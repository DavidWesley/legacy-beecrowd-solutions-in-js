//// READING FILE | STREAMS ////

const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")


/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */
function createReadLineInterface(path, encoding) {
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
 * @param {import("readline").ReadLine} readLineInterface
 */
function processLineByLine(readLineInterface) {
	let EOF = false

	const nextLineGenerator = (async function* () {
		for await (const line of readLineInterface) yield line
	})()

	readLineInterface.once("close", () => { EOF = true })

	return {
		hasNextLine: () => !EOF,
		nextLine: async (fn) => {
			const { value } = (await nextLineGenerator.next())
			return (typeof fn === "function") ? fn(value) : value
		}
	}
}


async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"
	const RLI = createReadLineInterface(PATH, ENCODING)

	const readLineInstance = processLineByLine(RLI)
	const nextLine = readLineInstance.nextLine.bind(undefined, (line = "") => line.toLowerCase().split(/[\W\b\s_\d]+/gi))

	const /** @type {Set<string>} */ uniqueWordsSet = new Set()

	while (readLineInstance.hasNextLine()) {
		const words = await nextLine()

		for (const word of words) {
			if (word === "") continue // Filtering empty strings
			else uniqueWordsSet.add(word)
		}
	}

	// Dictionary
	const output = Array
		.from(uniqueWordsSet.values())
		.sort((strA, strB) => strA.localeCompare(strB, "en-US"))

	console.log(output.join("\n"))
}

main()
