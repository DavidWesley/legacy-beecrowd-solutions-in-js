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


/**
 * @param {string} str1
 * @param {string} str2
 */
function longestCommonSubstring(str1, str2) {
	if (str1 === str2) return str2.length
	if (str2.split("").some((char) => str1.includes(char)) == false) return 0

	const buff = Array.from({ length: str1.length + 1 }, () => new Array(str2.length + 1).fill(0))

	let result = 0

	for (let i = 0; i <= str1.length; i++) {
		for (let j = 0; j <= str2.length; j++) {
			if (i == 0 || j == 0)
				continue
			else if (str1[i - 1] == str2[j - 1]) {
				buff[i][j] = buff[i - 1][j - 1] + 1
				result = Math.max(result, buff[i][j])
			} else
				buff[i][j] = 0
		}
	}

	return result
}

async function main() {
	const output = []
	const readLineInstance = processLineByLine(createReadLineInterface(PATH, ENCODING))

	while (readLineInstance.hasNextLine()) {
		const word1 = await readLineInstance.nextLine()
		const word2 = await readLineInstance.nextLine()

		if (!word1 || !word2) break
		else output.push(longestCommonSubstring(word1, word2))
	}

	console.log(output.join("\n"))
}

main()