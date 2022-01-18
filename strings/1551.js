const { readFileSync } = require("fs")
const [numTestCases, ...inputs] = readFileSync("/dev/stdin", "utf8").split("\n")

const replaceNonAlphaNumericsChars = (str, to = "") => str.split(/\W/i).join(`${to}`)

const countAlphas = (str = "") => new Set([...str.match(/[A-Z]/gi)]).size

function main() {
	const counterList = inputs.slice(0, +numTestCases).map((line) => {
		const alpha = replaceNonAlphaNumericsChars(line)
		return countAlphas(alpha)
	})

	const responses = counterList.map((quantity) => {
		const status = (size) => {
			if (size === 26) return "completa"
			else if (size >= 13) return "quase completa"
			else return "mal elaborada"
		}

		return `frase ${status(quantity)}`
	})

	console.log(responses.join("\n"))
}

main()
