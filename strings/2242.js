const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const reverse = str => [...str].reverse().join('')
const isVowel = (char = '') => char.length === 1 && /[aeiou]/gi.test(char)

function isAfunnyLaugh(laugth = '') {
	const laughtVowels = [...laugth].filter(isVowel)
	const reverseLaughtVowels = [...reverse(laugth)].filter(isVowel)

	return reverseLaughtVowels.every((value, index) => value === laughtVowels[index])
}

function main() {
	const firstWord = input.shift()
	const response = isAfunnyLaugh(firstWord) ? 'S' : 'N'

	console.log(response)
}

main()