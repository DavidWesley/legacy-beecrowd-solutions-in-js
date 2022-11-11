"use strict"

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function validateCardinalCode(evaluatedCardinalCode = "") {
	return Number.isInteger(Number(evaluatedCardinalCode))
}

const CardinalCodeEnum = Object.seal({
	North: "-3",
	South: "-2",
	East: "-4",
	West: "-1"
}) // Extensible by literal Modification

const UNSPECIFIED_CODE = "unspecified"

const CardinalCodesMap = new Map(
	Object
		.values(CardinalCodeEnum)
		.map((code) => [code, new Array(0)])
).set(UNSPECIFIED_CODE, new Array(0))

for (let index = 0, currentCardinalCode = ""; index < input.length; index++) {
	const line = input[index]
	if (line === "0") break // EOFile Condition

	if (validateCardinalCode(line)) currentCardinalCode = line
	else if (CardinalCodesMap.has(currentCardinalCode)) CardinalCodesMap.get(currentCardinalCode).push(line)
	else CardinalCodesMap.get(UNSPECIFIED_CODE).push(line) // Caso exista um código ainda não implementado, o avião será adicionado a uma fila de direção NÂO-ESPECIFICADA
}


function main() {

	const settledOrdainedCodesByPriorities = [
		CardinalCodeEnum.West,
		CardinalCodeEnum.North,
		CardinalCodeEnum.South,
		CardinalCodeEnum.East
	]

	// The rest will be ordained by default position on Enum Object.
	settledOrdainedCodesByPriorities.push(
		...Object.values(CardinalCodeEnum).filter(cardinalCode => !settledOrdainedCodesByPriorities.includes(cardinalCode))
	)

	const ordainedAirplanes = []
	const longerAirplanesQueue = Reflect.apply(
		Math.max,
		null,
		Array.from(CardinalCodesMap.values()).map(({ length }) => length)
	)

	// First In First Out -> Priority Queue
	for (let turn = 0; turn < longerAirplanesQueue; turn++) {
		for (const priorityCode of settledOrdainedCodesByPriorities) {
			if (CardinalCodesMap.get(priorityCode).length > 0) {
				const airplaneCode = CardinalCodesMap.get(priorityCode).shift()
				ordainedAirplanes.push(airplaneCode)
			}
		}
	}

	console.log(ordainedAirplanes.join(" "))
}

main()
