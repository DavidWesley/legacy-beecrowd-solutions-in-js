const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(' ')

const [numOne, numTwo] = input.map(num => Number.parseInt(num))

const isMultiples = (fNum = 0, sNum = fNum) => {
	fNum = Math.abs(fNum), sNum = Math.abs(sNum)
	return Math.max(fNum, sNum) % Math.min(sNum, fNum) === 0
}

function main() {
	let response = ""

	if (isMultiples(numOne, numTwo)) response = "Sao Multiplos"
	else response = "Nao sao Multiplos"

	console.log(response)
}

main()