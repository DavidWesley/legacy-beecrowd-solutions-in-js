const { readFileSync } = require("fs")
const firstWord = readFileSync("/dev/stdin", "utf8").split("\n").shift()

const reverse = str => [...str].reverse().join("")
const isVowel = (char = "") => char.length === 1 && /[aeiou]/i.test(char)

function isAfunnyLaugh(laugth = "") {
	const laughtVowels = [...laugth].filter(isVowel)
	const reverseLaughtVowels = [...reverse(laugth)].filter(isVowel)

	return reverseLaughtVowels.every((value, index) => value === laughtVowels[index])
}

function main() {
	const response = isAfunnyLaugh(firstWord) ? "S" : "N"
	console.log(response)
}

main()