const { readFileSync } = require("fs")
const inputs = readFileSync("./dev/stdin", "utf8").split('\n')

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const modulus = (num, modValue = 1) => Number(num) % modValue

function pureOrder([...entries]) {
	const result = []

	while (entries.length > 0) {
		const [N, M] = entries.shift()
		result.push(`${N} ${M}`)

		if (N == 0 || M == 0) break

		const sequenceValues = entries.splice(0, N)
		const sortedValues = sequenceValues.sort((a, b) => compareAndSortValuesFromMod(a, b, M))

		result.push(sortedValues.join('\n'))
	}

	return result
}


function main() {
	const formattedInputs = inputs.map(parseStringsEntriesToIntegers)
	const responses = pureOrder(formattedInputs)

	console.log(responses.join('\n'))
}

main()

function compareAndSortValuesFromMod(a = 0, b = 0, targetMod = 1) {
	// Comparando os módulos
	if (modulus(a, targetMod) > modulus(b, targetMod)) return 1
	else if (modulus(a, targetMod) < modulus(b, targetMod)) return -1

	// Comparando as paridades (Impares têm prioridades)
	if (isOdd(a) && isEven(b)) return -1 // Matendo a prioridade dos numeros impares
	else if (isEven(a) && isOdd(b)) return 1 // Invertendo a posição para manter os impares na frente

	// Comparando os impares (maiores na frente)
	if (isOdd(a) && isOdd(b)) return b - a // Os impares seguirão una ordem descrecente

	// Comparando os pares (menores na frente)
	if (isEven(a) && isEven(b)) return a - b // Os pares seguirão uma ordem crescente

	return 0 // resultado padrão
}

function parseStringsEntriesToIntegers(currentValue = '') {
	const toInt = (value = '') => Math.trunc(Number(value))
	const parsedToInt = toInt(currentValue)

	if (Number.isNaN(parsedToInt)) return currentValue.split(' ').map(toInt)
	return parsedToInt
}

// function formattAndParseStringsEntries(acccumulator, currentValue, index, arr) {
// 	const toInt = (value = '') => Math.trunc(Number(value))
// 	const parsedToInt = toInt(currentValue)

// 	if (Number.isNaN(parsedToInt)) {
// 		const newCurr = currentValue.split(' ').map(toInt)

// 		if (newCurr.every(v => v == 0))
// 			arr.splice(index + 1, arr.length - (index + 1))

// 		acccumulator.push(newCurr)
// 	} else
// 		acccumulator.push(parsedToInt)

// 	return acccumulator
// }
