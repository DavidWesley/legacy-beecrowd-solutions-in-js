const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

/** @typedef {string | number} strNumType */
/** @param {strNumType | (strNumType)[]} binariesList*/

function binaryToASCII(binariesList) {
	return String(binariesList)
		.split(/\s|\,/)
		.map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
		.join('')
}

function main() {
	const responses = []

	while (input.length > 0) {
		const quantities = Number.parseInt(input.shift(), 10)
		const binaries = input.splice(0, quantities)

		if (Number.isNaN(quantities)) break

		responses.push(binaryToASCII(binaries))
	}

	console.log(`${responses.join('\n')}`)
}

main()