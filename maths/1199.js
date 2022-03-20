const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const toDec = (num = "") => Number(num).toString(10)
const toHex = (num = "") => `0x${Number(num).toString(16).toUpperCase()}`

// const isHex = (num = '') => /^(0x)?[A-F0-9]+$/i.test(num)
const isStrictHex = (num = "") => /^(0x)[A-F0-9]+$/i.test(num)

function main() {
	const breakAt = input.indexOf("-1")
	const numbersList = input.slice(0, breakAt)

	const convertedNumbers = numbersList.map(num => {
		return isStrictHex(num) ? toDec(num) : toHex(num)
	})

	console.log(convertedNumbers.join("\n"))
}

main()