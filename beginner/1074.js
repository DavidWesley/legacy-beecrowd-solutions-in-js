const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(num => Number.parseInt(num, 10))

const isNegative = (num = 0) => Number(num) < 0
const isPositive = (num = 0) => Number(num) > 0
const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1 && num
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0 && num


function defineNumberProperties(num = 0) {
	const props = []

	if (isOdd(num)) props.push("ODD")
	else if (isEven(num)) props.push("EVEN")

	if (isPositive(num)) props.push("POSITIVE")
	else if (isNegative(num)) props.push("NEGATIVE")

	return props.length ? props.join(" ") : "NULL"
}

function main() {
	const responses = lines
		.slice(0, numLines)
		.map(defineNumberProperties)

	console.log(responses.join("\n"))
}

main()