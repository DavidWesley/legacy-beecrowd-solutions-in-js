const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")


const convertPortugueseNomenclatureToNumber = class PortugueseNomenclature {
	static #UNITS_NAMES_ENTRIES = [
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

	static #DOZENS_NAMES_ENTRIES = [
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

	static #HUNDREDS_NAMES_ENTRIES = [
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

	static #GROUPS_NAMES_ENTRIES = [
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

	static #MAPS = { names: {}, groups: {} }
	/** @typedef {[string, number]} nameNumType  */

	static {
		this.#MAPS.names["units"] = new Map(/** @type {nameNumType[]} */(this.#UNITS_NAMES_ENTRIES))
		this.#MAPS.names["dozens"] = new Map(/** @type {nameNumType[]} */(this.#DOZENS_NAMES_ENTRIES))
		this.#MAPS.names["hundreds"] = new Map(/** @type {nameNumType[]} */(this.#HUNDREDS_NAMES_ENTRIES))
		this.#MAPS.groups = new Map(/** @type {nameNumType[]} */(this.#GROUPS_NAMES_ENTRIES))
	}

	static #DEFAULT_AGREGATOR_WORD = "e"

	/** @param {string} name */
	static nameToNumber(name) {
		// if (PortugueseNomenclature.#MAPS.groups.has(name)) return PortugueseNomenclature.#MAPS.groups.get(name)
		// else if (PortugueseNomenclature.#MAPS.names["units"].has(name)) return PortugueseNomenclature.#MAPS.names["units"].get(name)
		// else if (PortugueseNomenclature.#MAPS.names["dozens"].has(name)) return PortugueseNomenclature.#MAPS.names["dozens"].get(name)
		// else if (PortugueseNomenclature.#MAPS.names["hundreds"].has(name)) return PortugueseNomenclature.#MAPS.names["hundreds"].get(name)
		// else 0

		return (
			PortugueseNomenclature.#MAPS.groups.get(name) ??
			PortugueseNomenclature.#MAPS.names["units"].get(name) ??
			PortugueseNomenclature.#MAPS.names["dozens"].get(name) ??
			PortugueseNomenclature.#MAPS.names["hundreds"].get(name) ??
			0
		)
	}

	/* PUBLIC METHODS */

	static converter(name = "") {
		name = name.toLowerCase()

		// Lidando com o caso especial: mil e alguma coisa depois
		if (name.startsWith("mil ")) name = "um " + name
		if (name.includes(" ") == false) return PortugueseNomenclature.nameToNumber(name)

		const numberNamesList = name
			.replace(RegExp(`\\b${PortugueseNomenclature.#DEFAULT_AGREGATOR_WORD}\\b`, "gi"), "")
			.replace(/w+/g, (s) => PortugueseNomenclature.nameToNumber(s).toString(10))
			.split(/\s+/)

		let tGroup = 0
		let result = 0

		for (const numberName of numberNamesList) {
			if (PortugueseNomenclature.#MAPS.groups.has(numberName)) {
				const factor = PortugueseNomenclature.nameToNumber(numberName)

				/**
				* Para o caso onde apenas o grupo existe
				* como o nosso querido mil
				* o caso mais problematico de todos
				* para nomear corretamente
				*/

				if (tGroup == 0 && factor == 1e3)
					tGroup = 1

				tGroup *= factor
				result += tGroup
				tGroup = 0
			} else {
				tGroup += PortugueseNomenclature.nameToNumber(numberName)
			}
		}
		result += tGroup
		return result
	}
}

const { converter } = convertPortugueseNomenclatureToNumber

function main() {
	const responses = []

	for (const name of input)
		if (name == "") break
		else responses.push(converter(name))

	console.log(responses.join("\n"))
}

main()
