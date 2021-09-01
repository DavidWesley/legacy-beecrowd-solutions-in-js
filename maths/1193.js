const { readFileSync } = require("fs")
const [[entriesLength], ...entries] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(entry => entry.split(' '))


const ConvertBase = (num) => ({
	from: (baseFrom) => ({
		to: (baseTo) => parseInt(num, baseFrom).toString(baseTo)
	})
})

/** @type {[string, number][]} */
const radixesEntries = [
	// ['oct', 8],
	['dec', 10],
	['hex', 16],
	['bin', 2]
] // Ordenado dessa forma para sair como o Udebug aceita

const radixes = Object.fromEntries(radixesEntries)

function main() {
	const responses = []

	const numbersEntries = entries.slice(0, +entriesLength)

	for (const [index, [num, radixCode]] of numbersEntries.entries()) {

		const currentArray = []

		currentArray.push(`Case ${+index + 1}:`)

		const convertNum = ConvertBase(num)
		const otherCodes = Object.keys(radixes).filter(code => code !== radixCode)

		otherCodes.forEach(code => {
			const baseFrom = radixes[radixCode]
			const baseTo = radixes[code]

			currentArray.push(`${convertNum.from(baseFrom).to(baseTo)} ${code}`)
		})

		responses.push(
			`${currentArray.map(line => line.concat('\n')).join('')}`
		)
	}

	console.log(`${responses.join('\n')}`)
}

main()