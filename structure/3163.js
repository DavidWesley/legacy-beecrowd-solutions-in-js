"use strict"

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function isAValidCardinalCode(avaliadedCardinalCode = "") {
	return Number.isInteger(+avaliadedCardinalCode)
}

const CardinalCodeEnum = Object.seal({
	North: "-3",
	South: "-2",
	East: "-4",
	West: "-1"
}) // Extensible by literal Modification

const UNSPECIFIED_CODE = "unspecified"

const CardinalCodesMap = new Map(
	Object.values(CardinalCodeEnum).map((code) => [code, new Array(0)])
).set(UNSPECIFIED_CODE, new Array(0))

for (let indexLine = 0, currentCardinalCode = ""; indexLine < input.length; indexLine++) {
	const line = input[indexLine]
	if (line === "0") break //EOFile Condition

	if (isAValidCardinalCode(line)) currentCardinalCode = line
	else if (CardinalCodesMap.has(currentCardinalCode)) CardinalCodesMap.get(currentCardinalCode).push(line)
	else CardinalCodesMap.get(UNSPECIFIED_CODE).push(line) // Case exista um código ainda não implementado, o avião será adicionado a uma fila de direção NÂO-ESPECIFICADA
}


function main() {

	const settledOrdenedCodesByPriorities = [
		CardinalCodeEnum.West,
		CardinalCodeEnum.North,
		CardinalCodeEnum.South,
		CardinalCodeEnum.East
	]

	// The rest will be ordened by default position on Enum Object.
	settledOrdenedCodesByPriorities.push(
		...Object.values(CardinalCodeEnum).filter(cardinalCode => !settledOrdenedCodesByPriorities.includes(cardinalCode))
	)

	const ordenedAirplanes = []
	const longerAirplanesQueue = Reflect.apply(
		Math.max,
		null,
		Array.from(CardinalCodesMap.values()).map(({ length }) => length)
	)

	// First In Fitst Out -> Priority Queue
	for (let turn = 0; turn < longerAirplanesQueue; turn++) {
		for (const priorityCode of settledOrdenedCodesByPriorities) {
			if (CardinalCodesMap.get(priorityCode).length > 0) {
				const airplaneCode = CardinalCodesMap.get(priorityCode).shift()
				ordenedAirplanes.push(airplaneCode)
			}
		}
	}

	console.log(`${ordenedAirplanes.join(' ')}`)
}

main()