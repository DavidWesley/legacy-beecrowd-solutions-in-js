const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

//// CONVERTER ////

const convertPortugueseNumeralNomenclatureToNumber = function PortugueseNumeralNomenclatureConverter() {
	const UNITS_NAMES_ENTRIES = [
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

	const DOZENS_NAMES_ENTRIES = [
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

	const HUNDREDS_NAMES_ENTRIES = [
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

	const GROUPS_NAMES_ENTRIES = [
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
		// ...
	]

	/** @typedef {[string, number]} nameNumType  */

	const mapUnitsNames = new Map(/** @type {nameNumType[]} */(UNITS_NAMES_ENTRIES))
	const mapDozensNames = new Map(/** @type {nameNumType[]} */(DOZENS_NAMES_ENTRIES))
	const mapHundrendsNames = new Map(/** @type {nameNumType[]} */(HUNDREDS_NAMES_ENTRIES))
	const mapGroupsNames = new Map(/** @type {nameNumType[]} */(GROUPS_NAMES_ENTRIES))

	/** @param {string} name */
	function nameToNumber(name) {
		if (mapGroupsNames.has(name)) return mapGroupsNames.get(name)
		else if (mapUnitsNames.has(name)) return mapUnitsNames.get(name)
		else if (mapDozensNames.has(name)) return mapDozensNames.get(name)
		else if (mapHundrendsNames.has(name)) return mapHundrendsNames.get(name)
		// else throw new Error(`The name "${name}" is not a valid argument`)
		else return Number.NaN
	}

	function converter(name = "") {
		name = name.toLowerCase()
		const DEFAULT_AGREGATOR_WORD = "e"

		if (name.startsWith("mil ")) name = "um ".concat(name)
		if (name.includes(" ") === false) return nameToNumber(name)

		let total = 0
		let partial = 0

		name
			.replace(RegExp(`\\b${DEFAULT_AGREGATOR_WORD}\\b`, "gi"), "")
			.replace(/w+/g, (s) => nameToNumber(s).toString(10))
			.split(/\s+/)
			.forEach((label) => {
				if (mapGroupsNames.has(label)) {
					const factor = nameToNumber(label)
					if (partial === 0 && factor === 1e3) partial = 1

					partial *= factor
					total += partial
					partial = 0
				} else { partial += nameToNumber(label); }
			})

		return total + partial
	}

	return Object.freeze({ convert: converter.bind(PortugueseNumeralNomenclatureConverter) })
}

//// MAIN ////

function main() {
	const output = []

	const { convert } = convertPortugueseNumeralNomenclatureToNumber()

	for (const text of input) {
		if (text === "") break // EOF
		output.push(convert(text))
	}

	console.log(output.join("\n"))
}

main()