const { readFileSync } = require("fs")
const [numCases, ...input] = readFileSync("/dev/stdin", "utf8").split(/\s+/g)

const lostInMarsMsg = (message) => String.fromCharCode(...message)

function main() {
	const formattedMessages = input.slice(0, +numCases).map(hex => `0x${hex}`)
	const message = lostInMarsMsg(formattedMessages)

	console.log(message)
}

main()