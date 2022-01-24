const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(int => Number.parseInt(int, 10))

const { converter } = convertNumberToPortugueseNomenclature()

function main() {
	const responses = []

	for (const num of input) {
		if (isNaN(num)) break // EOFile Condition Verification
		responses.push(converter(num))
	}

	console.log(responses.join("\n"))
}

main()

function convertNumberToPortugueseNomenclature() {
	const unitsNames = [
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
	const dozensNames = [
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
	const hundredsNames = [
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

	const mapUnitsNames = new Map(Object.entries(unitsNames))
	const mapDozensNames = new Map(Object.entries(dozensNames))
	const mapHundrendsNames = new Map(Object.entries(hundredsNames))

	const numberFormatterInstance = new Intl.NumberFormat('en-US', {
		style: "decimal",
		useGrouping: true,
		minimumIntegerDigits: 9, // Limitado até 999.999.999 -> Não tente utilizar números maiores
		maximumFractionDigits: 0
	})


	function convertOrderNumberIntoTextName(order = "000", customJoinCharacter, orderTermination = { single: "", plural: "" }) {
		const num = Number.parseInt(order, 10)
		const terminationText = ` ${num >= 2 ? orderTermination.plural : orderTermination.single}`

		if (num === 0)
			return ""

		else if (num === 100)
			return `${customJoinCharacter} ${mapDozensNames.get("10").concat(terminationText)}`

		else if (num % 100 === 0 && num !== 0)
			return `${customJoinCharacter} ${mapHundrendsNames.get(order[0])}${terminationText}`

		else
			return [...order].map((value, index, arr) => {
				if (index === 0)
					return `${mapHundrendsNames.get(value).concat(value !== "0" ? " " : "")}${customJoinCharacter}`

				else if (index === 1)
					return ["0", "1"].includes(value) ? "" : `${mapDozensNames.get(value)}`

				else if (arr[index - 1] === "1")
					return mapUnitsNames.get(`1${value}`)

				else
					return `${value === "0" || arr[index - 1] === "0" ? "" : customJoinCharacter + " "}${mapUnitsNames.get(value)}`

			})
				.filter(value => Boolean(value))
				.join(" ")
				.replace(RegExp(`(\\s+${customJoinCharacter})$`, 'g'), "")
				.concat(terminationText)
	}


	function converter(/** @type {number | bigint} */ num, customJoinCharacter = "e") {
		if (num === 0) return "zero"

		const [simpleOrderNum, thounsandOrderNum, milionOrderNum] = numberFormatterInstance
			.format(num)
			.split(",")
			.reverse()

		const simpleOrderText = convertOrderNumberIntoTextName(simpleOrderNum, customJoinCharacter)
		const thousandOrderText = convertOrderNumberIntoTextName(thounsandOrderNum, customJoinCharacter, { plural: "mil", single: "mil" })
		const milionOrderText = convertOrderNumberIntoTextName(milionOrderNum, customJoinCharacter, { plural: "milhões", single: "milhão" })

		const portugueseNomenclatureText = [milionOrderText, thousandOrderText, simpleOrderText]
			.join(" ")
			.trim()
			.replace(RegExp(`^${customJoinCharacter}\\s+`), "") // Solving second bug in Portuguese Language => {e ;e}
			.replace(/(^um mil\b)/, "mil") // SOlving first Bug in Portuguese Language => {um mil ; mil}

		return portugueseNomenclatureText
	}

	return { converter }
}