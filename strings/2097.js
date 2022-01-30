const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const convertPortugueseNomenclatureToNumber = (function () {
	const UNITS_NAMES = [
		["zero", 0],
		["um", 1],
		["dois", 2],
		["tres", 3],
		["três", 3],
		["quatro", 4],
		["cinco", 5],
		["seis", 6],
		["sete", 7],
		["oito", 8],
		["nove", 9],
		["dez", 10],
		["onze", 11],
		["doze", 12],
		["treze", 13],
		["quatorze", 14],
		["catorze", 14],
		["quinze", 15],
		["dezesseis", 16],
		["dezessete", 17],
		["dezoito", 18],
		["dezenove", 19]
	]

	const DOZENS_NAMES = [
		["dez", 10],
		["vinte", 20],
		["trinta", 30],
		["quarenta", 40],
		["cinquenta", 50],
		["sessenta", 60],
		["setenta", 70],
		["oitenta", 80],
		["noventa", 90],
		["cem", 100]
	]

	const HUNDREDS_NAMES = [
		["cento", 100],
		["duzentos", 200],
		["trezentos", 300],
		["quatrocentos", 400],
		["quinhentos", 500],
		["seiscentos", 600],
		["setecentos", 700],
		["oitocentos", 800],
		["novecentos", 900],
	]

	const GROUPS_NAMES = [
		["mil", 1e3],

		["milhao", 1e6],
		["milhão", 1e6],
		["milhoes", 1e6],
		["milhões", 1e6],

		["bilhao", 1e9],
		["bilhão", 1e9],
		["bilhoes", 1e9],
		["bilhões", 1e9],

		["trilhao", 1e12],
		["trilhão", 1e12],
		["trilhoes", 1e12],
		["trilhões", 1e12],
		// Poderia aumentar se usassemos bigints
	]

	/** @typedef {[string, number]} nameNumType  */

	const mapUnitsNames = new Map(/** @type {nameNumType[]} */(UNITS_NAMES))
	const mapDozensNames = new Map(/** @type {nameNumType[]} */(DOZENS_NAMES))
	const mapHundrendsNames = new Map(/** @type {nameNumType[]} */(HUNDREDS_NAMES))

	const mapGroupsNames = new Map(/** @type {nameNumType[]} */(GROUPS_NAMES))


	/** @param {string} name */
	function nameToNumber(name) {
		if (mapGroupsNames.has(name)) return mapGroupsNames.get(name)
		else if (mapUnitsNames.has(name)) return mapUnitsNames.get(name)
		else if (mapDozensNames.has(name)) return mapDozensNames.get(name)
		else if (mapHundrendsNames.has(name)) return mapHundrendsNames.get(name)
		else 0
	}

	const DEFAULT_AGREGATOR_WORD = "e"

	function converter(name = "") {
		name = name.toLowerCase()

		// Lidando com o caso especial: mil e alguma coisa depois
		if (name.startsWith("mil ")) name = "um " + name
		if (name.includes(" ") == false) return nameToNumber(name)

		const numberNames = name
			.replace(RegExp(`\\b${DEFAULT_AGREGATOR_WORD}\\b`, "gi"), "")
			.replace(/w+/g, (s) => nameToNumber(s).toString(10))
			.split(/\s+/)

		let tGroup = 0
		let result = 0

		for (const NN of numberNames) {
			if (mapGroupsNames.has(NN)) {
				const factor = nameToNumber(NN)

				/**
				* Para o caso onde apenas o grupo existe
				* como o nosso querido mil
				* o caso mais problematico de todos
				* para nomear corretamente
				*/

				if (tGroup == 0 && factor == 1e3) tGroup = 1

				tGroup *= factor
				result += tGroup
				tGroup = 0
			} else {
				tGroup += nameToNumber(NN)
			}
		}

		result += tGroup

		return result
	}

	return { converter }
})() // Carrega tudo o que for necessario apenas uma vez -> PayLoad Operation

const { converter } = convertPortugueseNomenclatureToNumber

function main() {
	const responses = []

	for (const name of input)
		if (name == "") break
		else responses.push(converter(name))

	console.log(responses.join("\n"))
}

main()
