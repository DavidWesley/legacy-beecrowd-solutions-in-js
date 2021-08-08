const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')
const responses = []

let inputNumber = parseInt(input.shift())

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function main() {
	const limitLoop = 6
	const initialValue = isOdd(inputNumber) ? inputNumber : isEven(inputNumber) ? ++inputNumber : 0

	for (let loop = 0; loop < limitLoop; loop++) responses.push(initialValue + loop * 2)
	console.log(responses.join('\n'))
}

main()