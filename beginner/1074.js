const { readFileSync } = require("fs")
const [numCases, ...numbersList] = readFileSync("/dev/stdin", "utf8")
	.split('\n')
	.map(num => Number.parseInt(num, 10))

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

	return "NULL"
}

function main() {
	const responses = numbersList
		.slice(0, numCases)
		.map(defineNumberProperties)

	console.log(responses.join('\n'))
}

main()