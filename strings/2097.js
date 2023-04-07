const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

//// CONVERTER ////

const convertPortugueseNumeralNomenclatureToNumber = function PortugueseNumeralNomenclatureConverter() {
	const PORTUGUESE_UNITS_NAMES_ENTRIES = [
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

	const PORTUGUESE_DOZENS_NAMES_ENTRIES = [
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

	const PORTUGUESE_HUNDREDS_NAMES_ENTRIES = [
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

	const PORTUGUESE_GROUPS_NAMES_ENTRIES = [
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

	const PORTUGUESE_DEFAULT_AGGREGATOR_WORD = "e"
	const PORTUGUESE_NUMERAL_SEPARATOR_REGEX = new RegExp(`\\s*\\b${PORTUGUESE_DEFAULT_AGGREGATOR_WORD}?\\b\\s*`, "gi")

	/** @typedef {[string, number]} nomenclatureNumType  */

	const PortugueseUnitsNamesMap = new Map(/** @type {nomenclatureNumType[]} */(PORTUGUESE_UNITS_NAMES_ENTRIES))
	const PortugueseDozensNamesMap = new Map(/** @type {nomenclatureNumType[]} */(PORTUGUESE_DOZENS_NAMES_ENTRIES))
	const PortugueseHundredsNamesMap = new Map(/** @type {nomenclatureNumType[]} */(PORTUGUESE_HUNDREDS_NAMES_ENTRIES))
	const PortugueseGroupsNamesMap = new Map(/** @type {nomenclatureNumType[]} */(PORTUGUESE_GROUPS_NAMES_ENTRIES))

	/** @param {string} name */
	function toNumber(name) {
		if (PortugueseGroupsNamesMap.has(name)) return PortugueseGroupsNamesMap.get(name)
		else if (PortugueseUnitsNamesMap.has(name)) return PortugueseUnitsNamesMap.get(name)
		else if (PortugueseDozensNamesMap.has(name)) return PortugueseDozensNamesMap.get(name)
		else if (PortugueseHundredsNamesMap.has(name)) return PortugueseHundredsNamesMap.get(name)
		// else throw new Error(`The name "${name}" is not a valid argument`)
		else return Number.NaN
	}

	function converter(name = "") {
		name = name
			.trim()
			.toLowerCase()

		if (name.includes(" ") === false) return toNumber(name)

		let total = 0
		let partial = 0
		let partialHasChanged = false

		name
			.split(PORTUGUESE_NUMERAL_SEPARATOR_REGEX)
			.forEach((label) => {
				if (PortugueseGroupsNamesMap.has(label)) {
					const factor = toNumber(label)

					if (partial === 0 && partialHasChanged === false)
						partial = 1

					partial *= factor
					total += partial
					partial = 0
					partialHasChanged = false
				} else {
					partial += toNumber(label)
					partialHasChanged = true
				}
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