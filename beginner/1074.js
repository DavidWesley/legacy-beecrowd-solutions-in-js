const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const [numTestCases, ...numbersList] = input.map(num => parseInt(num))

const isNegative = (num = 0) => Number(num) < 0
const isPositive = (num = 0) => Number(num) > 0
const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1 && num
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0 && num


function defineNumberProperties(num = 0) {
	let prop = ""

	if (isOdd(num)) prop = "ODD"
	else if (isEven(num)) prop = "EVEN"

	if (isPositive(num)) return `${prop} POSITIVE`
	else if (isNegative(num)) return `${prop} NEGATIVE`

	return 'NULL'
}

function main() {

	const responses = []

	for (const [index, number] of Object.entries(numbersList)) {
		if (parseInt(index) === numTestCases) break
		const numPros = defineNumberProperties(number)
		responses.push(numPros)
	}

	console.log(responses.join('\n'))
}

main()