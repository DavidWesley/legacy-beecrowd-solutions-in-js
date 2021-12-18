const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split('\n')

function convertStringToAlternatingCase(sequence = '', from = 0) {
	const prequel = sequence.substring(0, from)
	const posquel = sequence.slice(from).replace(/[a-z]+/gi, (match) => {
		const formatted = Array.from(match, (char, index) => (index + from) % 2 == 0 ? char.toUpperCase() : char.toLowerCase()).join('')
		from += formatted.length

		return formatted
	})

	return `${prequel}${posquel}`
}

function main() {
	const responses = []

	for (const sentence of lines) {
		if (sentence == '') break // EOFile Condilion
		const dancingSentence = convertStringToAlternatingCase(sentence, 0)

		responses.push(dancingSentence)
	}

	console.log(`${responses.join('\n')}`)
}

main()