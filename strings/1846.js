const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")


const convertNumberToPortugueseNomenclature = (function () {
	const UNITS_NAMES_LIST = [
		"",
		"um",
		"dois",
		"tres",
		"quatro",
		"cinco",
		"seis",
		"sete",
		"oito",
		"nove",
		"dez",
		"onze",
		"doze",
		"treze",
		"quatorze",
		"quinze",
		"dezesseis",
		"dezessete",
		"dezoito",
		"dezenove",
	]

	const DOZENS_NAMES_LIST = [
		"",
		"dez",
		"vinte",
		"trinta",
		"quarenta",
		"cinquenta",
		"sessenta",
		"setenta",
		"oitenta",
		"noventa",
		"cem",
	]

	const HUNDREDS_NAMES_LIST = [
		"",
		"cento",
		"duzentos",
		"trezentos",
		"quatrocentos",
		"quinhentos",
		"seiscentos",
		"setecentos",
		"oitocentos",
		"novecentos",
	]

	const ORDERS_ENUM = {
		get simple() { return { plural: "", single: "" } },
		get thousand() { return { plural: "mil", single: "mil" } },
		get million() { return { plural: "milhões", single: "milhão" } },
		get billion() { return { plural: "bilhões", single: "bilhão" } },
		get trillion() { return { plural: "trilhões", single: "trilhão" } },
		get quadrillion() { return { plural: "quatrilhões", single: "quatrilhão" } },
		get quintillion() { return { plural: "quintilhões", single: "quintilhão" } },
		get sextillion() { return { plural: "sextilhões", single: "sextilhão" } },
		get setillion() { return { plural: "septilhões", single: "septilhão" } },
		get octillion() { return { plural: "octilhões", single: "octilhão" } },
		get nonillion() { return { plural: "nonilhões", single: "nonilhão" } },
		get decillion() { return { plural: "decilhões", single: "decilhão" } },
		// And so on...
	}

	const ORDERS_NAME = Object.keys(ORDERS_ENUM)
	const DEFAULT_AGREGATOR_WORD = "e"
	const MAXIMUN_FRACTION_DIGITS = 0 // Apenas inteiros!


	const MapUnitsNames = new Map(Object.entries(UNITS_NAMES_LIST))
	const MapDozensNames = new Map(Object.entries(DOZENS_NAMES_LIST))
	const MapHundrendsNames = new Map(Object.entries(HUNDREDS_NAMES_LIST))

	/**
	 * @description Essa função precisa **muito** de uma melhora
	 * @param {string} order
	 * @param {string} joinerWord
	 * @param {{ single: string, plural: string }} orderTermination
	 */

	function numberToNomenclature(order = "000", joinerWord = DEFAULT_AGREGATOR_WORD, orderTermination = ORDERS_ENUM.simple) {
		order = order.length !== 3 ? order.padStart(3, "0").substring(0, 3) : order // Normalizating order

		const num = Number.parseInt(order, 10)
		const terminationText = ` ${num >= 2 ? orderTermination.plural : orderTermination.single}`

		if (num === 0)
			return ""

		else if (num === 100)
			return `${joinerWord} ${MapDozensNames.get("10").concat(terminationText)}`

		else if (num % 100 === 0 && num !== 0)
			return `${joinerWord} ${MapHundrendsNames.get(order[0])}${terminationText}`

		else
			return [...order].map((value, index, arr) => {
				if (index === 0)
					return `${MapHundrendsNames.get(value).concat(value !== "0" ? " " : "")}${joinerWord}`

				else if (index === 1)
					return ["0", "1"].includes(value) ? "" : `${MapDozensNames.get(value)}`

				else if (arr[index - 1] === "1")
					return MapUnitsNames.get(`1${value}`)

				else
					return `${value === "0" || arr[index - 1] === "0" ? "" : joinerWord + " "}${MapUnitsNames.get(value)}`

			})
				.filter(value => Boolean(value))
				.join(" ")
				.replace(RegExp(`(\\s+${joinerWord})$`, "g"), "")
				.concat(terminationText)
	}

	/** @param {Parameters<BigIntConstructor>[0]} num */

	function converter(num) {
		num = BigInt(num)
		if (num === 0n) return "zero"

		const orders = num
			.toLocaleString("fullwide", { maximumFractionDigits: MAXIMUN_FRACTION_DIGITS })
			.split(/\D/)

		const portugueseNomenclatureText = orders
			.map((order, index, arr) => {
				return numberToNomenclature(order, DEFAULT_AGREGATOR_WORD, ORDERS_ENUM[ORDERS_NAME[arr.length - index - 1]])
			})
			.join(" ")
			.trim()
			.replace(RegExp(`^${DEFAULT_AGREGATOR_WORD}\\s+`), "") // Solving second bug in Portuguese Language => {e ;e}
			.replace(/(^um mil\b)/, "mil") // Solving first Bug in Portuguese Language => {um mil ; mil}

		return portugueseNomenclatureText
	}

	return { converter }

})() // Payload First Operation <-> PAGANDO TUDO NUMA TACADA só. O LADO RUIM? REFERENCING HELLLLL! Mas quem liga?


const { converter } = convertNumberToPortugueseNomenclature

function main() {
	const responses = []

	for (const num of input) {
		if (num == "") break // EOF
		responses.push(converter(num))
	}

	console.log(responses.join("\n"))
}

main()