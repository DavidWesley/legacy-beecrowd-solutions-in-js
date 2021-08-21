const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

function main() {
	const responses = []

	const breakExecAtIndex = input.indexOf('0')
	const sizes = input.slice(0, breakExecAtIndex).map(size => Number.parseInt(size, 10))

	sizes.forEach(size => {
		const spaceLength = `${Math.pow(2, (size - 1) * 2)}`.length
		const currentMatrix = Array.from({ length: size }, () => [])

		const currentMatrizJoined = []

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++)
				currentMatrix[i][j] = `${Math.pow(2, i + j)}`.padStart(spaceLength, ' ')

			currentMatrizJoined.push(currentMatrix[i].join(' '))
		}

		responses.push(currentMatrizJoined.join('\n'))
	})

	console.log(`${responses.join('\n\n')}\n`)
}

main()