const { readFileSync } = require("fs")
const [numCases, ...texts] = readFileSync("/dev/stdin", "utf8").split("\n")

// Compose functions from left to right
const pipe = (...fns) => (value) => fns.reduce((res, fn) => fn(res), value)

// /** @param {string} text */
// function criptgraph(text) {
// 	return pipe(criptOne, criptTwo, criptThree)(text)
// }

// Prevent unnecessary re-pipering, but parameter's information has been hidden
const criptgraph = pipe(criptOne, criptTwo, criptThree)

function main() {
	const responses = texts.slice(0, +numCases).map(criptgraph)
	console.log(responses.join("\n"))
}

main()

/** @param {string} text */

function criptOne(text) {
	return text.replace(/[a-zA-Z]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 3))
}

/** @param {string} text */

function criptTwo(text) {
	if (text.length < 2) return text
	return [...text].reverse().join("")
}

/** @param {string} text */

function criptThree(text) {
	const limit = Math.trunc(text.length / 2)
	const originalText = text.substr(0, limit)
	const processedText = text.substr(limit).replace(/./g, (char) => String.fromCharCode(char.charCodeAt(0) - 1))

	return `${originalText}${processedText}`
}
