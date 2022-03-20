const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

const numTestCases = input.match(/^\d+$/gm)[0]
const testCases = input.match(/^(\w{1,50})\s+(\d{1,2})$/gm)

const caesarCipher = (str, shift, decrypt = false) => {
	const s = decrypt ? (26 - shift) % 26 : shift
	const n = s > 0 ? s : 26 + (s % 26)

	const [minUpper, maxUpper] = [65, 90]
	const [minLower, maxLower] = [97, 122]

	return [...str]
		.map((char, index) => {
			const c = str.charCodeAt(index)

			if (c >= minUpper && c <= maxUpper) return String.fromCharCode(((c - minUpper + n) % 26) + minUpper)
			else if (c >= minLower && c <= maxLower) return String.fromCharCode(((c - minLower + n) % 26) + minLower)
			else return char
		})
		.join("")
}

function main() {
	const decodedTextList = []

	for (const index in testCases) {
		if (index === numTestCases) break

		const [text, rightWardPositions] = testCases[index].split(/\s+/g)
		const decodedText = caesarCipher(text, +rightWardPositions, true)

		decodedTextList.push(decodedText)
	}

	console.log(decodedTextList.join("\n"))
}

main()