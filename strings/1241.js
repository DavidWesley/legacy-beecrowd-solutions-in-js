const { readFileSync } = require("fs")

const [[numTestCases], ...pairTextList] = readFileSync("/dev/stdin", "utf8")
	.split('\n')
	.map((line) => line.split(' '))

function fitIn([firstValueString = '', secondValueString = '']) {
	const firstStringLen = firstValueString.length
	const secondStringLen = secondValueString.length

	if (firstStringLen < secondStringLen) return false
	const lastFirstSubstring = firstValueString.substr(firstStringLen - secondStringLen)

	return lastFirstSubstring === secondValueString
}

function main() {
	const responses = []

	for (const [index, [firstValue, secondValue]] of Object.entries(pairTextList)) {
		if (index === numTestCases) break
		const isFit = fitIn([firstValue, secondValue])

		if (isFit) responses.push("encaixa")
		else responses.push("nao encaixa")
	}

	console.log(responses.join("\n"))
}

main()