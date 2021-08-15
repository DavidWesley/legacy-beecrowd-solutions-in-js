const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const endPointCode = '4'
const endPointCodeIndex = input.indexOf(endPointCode)

const fuelCodesObj = {
	'1': 'Alcool',
	'2': 'Gasolina',
	'3': 'Diesel',
}

function main() {
	const responses = []

	const validCodes = input
		.slice(0, endPointCodeIndex)
		.filter(code => code in fuelCodesObj)

	const fuelTypesEntries = Object
		.values(fuelCodesObj)
		.map(fuelType => [`${fuelType}`, 0])

	validCodes.forEach(code => { fuelTypesEntries[`${Number.parseInt(code) - 1}`][1]++ })

	fuelTypesEntries.forEach(([fuelType, quantity]) => { responses.push(`${fuelType}: ${quantity}`) })

	console.log(responses.join('\n'))
}

console.log('MUITO OBRIGADO')
main()