const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const digits = "0123456789"
const lowers = ALPHABET.toLowerCase()
const uppers = ALPHABET.toUpperCase()

/** @type {[number, number][]} */
const alphaNumsCodesList = [...digits, ...uppers, ...lowers].map((char, index) => [char.charCodeAt(0), index])
const basesCodeMap = new Map(alphaNumsCodesList)

function main() {
	const responses = []

	for (const num of input) {
		if (num === "") break // EOFileCondition
		const base = getMinimunValidBase(num)

		responses.push(base)
	}

	console.log(responses.join("\n"))
}

main()

function getMinimunValidBase(num) {
	if (num.charAt(0) === "-") num = num.substring(1)

	let m = 0
	let f = 0
	let c = 0

	for (const char of num) {
		c = basesCodeMap.get(char.charCodeAt(0))
		f += c
		m = c > m ? c : m
	}

	if (f >= 2) {
		while (m < 62) {
			if (f % m == 0) return m + 1
			m++
		}

		if (m === 62) return "such number is impossible!"
	}

	return "2"
}