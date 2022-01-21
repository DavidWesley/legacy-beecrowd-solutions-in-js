const { createReadStream } = require("fs")
const { createInterface } = require("readline")

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

const nextLine = (function () {
	const nextLineGen = (async function* () {
		for await (const line of RLI) {
			yield line
		}
	})()

	return async () => (await nextLineGen.next()).value
})()


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
	const responses = []

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const word1 = await nextLine()
		const word2 = await nextLine()

		if (!word1 || !word2) break
		else responses.push(longestCommonSubstring(word1, word2))
	}

	console.log(responses.join("\n"))
}

main()