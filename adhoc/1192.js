const { readFileSync } = require("fs")
const [numTestCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const isUpperCase = (str = "") => str == str.toUpperCase() && str != str.toLowerCase()
const isLowerCase = (str = "") => str == str.toLowerCase() && str != str.toUpperCase()

const misteryCalc = (/** @type {number} */ fNum) => (/** @type {string} */ char) => (/** @type {number} */ sNum) => {
	// Pega num -> ler char -> pega novo num | retorna o valor com base na operação
	if (sNum == fNum) return sNum * fNum
	else if (isUpperCase(char)) return sNum - fNum
	else if (isLowerCase(char)) return sNum + fNum
	else return 0
}

function main() {
	const responses = lines.slice(0, +numTestCases).map(([numA, char, numB]) => {
		const firstNum = Number.parseInt(numA, 10)
		const secondNum = Number.parseInt(numB, 10)

		return misteryCalc(firstNum)(char)(secondNum)
	})

	console.log(responses.join("\n"))
}

main()