const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const output = []

	for (const line of input)
		if (line === "") break // EOFile Condition Verification
		else output.push(brokenKeyboardFormatter(line))

	console.log(output.join("\n"))
}

main()

function brokenKeyboardFormatter(text) {
	let result = ""

	for (let index = 0; index < text.length; index++) {
		let char = text[index]

		if (char === "[") {
			const [strToPutOnStart, nIndex] = insertTextFrom(index + 1, text)
			index = nIndex
			result = strToPutOnStart.concat(result)
		} else if (char === "]") {
			const [strToPutOnEnd, nIndex] = insertTextFrom(index + 1, text)
			index = nIndex
			result = result.concat(strToPutOnEnd)
		} else {
			result += char
		}
	}

	return result
}

/**
 * @param {number} from
 * @param {string} text
 * @return {[string, number]}
 */
function insertTextFrom(from, text = "") {
	let index = from
	for (; index < text.length; index++)
		if (text.charAt(index) === "[" || text.charAt(index) === "]")
			break

	return [text.substring(from, index), index - 1]
}
