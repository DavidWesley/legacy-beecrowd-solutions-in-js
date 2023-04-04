const { readFileSync } = require("node:fs");
const input = readFileSync("/dev/stdin", "utf8").split("\n");

const convertNumberToPortugueseNomenclature = function PortugueseNumeralNomenclatureConverter() {
	const PORTUGUESE_UNITS_NAMES_LIST = [
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
	];

	const PORTUGUESE_DOZENS_NAMES_LIST = [
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
	];

	const PORTUGUESE_HUNDREDS_NAMES_LIST = [
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
	];

	const PORTUGUESE_GROUPS_ENUM = Object.values({
		get simple() { return { plural: "", single: "" } },
		get thousand() { return { plural: "mil", single: "mil" } },
		get million() { return { plural: "milhões", single: "milhão" } },
		get billion() { return { plural: "bilhões", single: "bilhão" } },
		get trillion() { return { plural: "trilhões", single: "trilhão" } },
		get quadrillion() { return { plural: "quatrilhões", single: "quatrilhão" } },
		get quintillion() { return { plural: "quintilhões", single: "quintilhão" } },
		get sextillion() { return { plural: "sextilhões", single: "sextilhão" } },
		get septillion() { return { plural: "septilhões", single: "septilhão" } },
		get octillion() { return { plural: "octilhões", single: "octilhão" } },
		get nonillion() { return { plural: "nonilhões", single: "nonilhão" } },
		get decillion() { return { plural: "decilhões", single: "decilhão" } },
		// And so on...
	});

	const PortugueseUnitsNamesMap = new Map(Object.entries(PORTUGUESE_UNITS_NAMES_LIST));
	const PortugueseDozensNamesMap = new Map(Object.entries(PORTUGUESE_DOZENS_NAMES_LIST));
	const PortugueseHundredsNamesMap = new Map(Object.entries(PORTUGUESE_HUNDREDS_NAMES_LIST));

	const PORTUGUESE_DEFAULT_AGGREGATOR_WORD = "e";
	const MINIMUM_INTEGER_DIGITS = 9;
	const MAXIMUM_FRACTION_DIGITS = 0;
	const NUMBER_FORMATTER = new Intl.NumberFormat("pt-BR", {
		style: "decimal",
		useGrouping: true,
		minimumIntegerDigits: MINIMUM_INTEGER_DIGITS,
		maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
	});

	/**
	 * @param {string | number | bigint} value
	 * @param {Intl.NumberFormatPartTypes} groupName
	 */
	function extractGroupsFromNumber(value, groupName) {
		return NUMBER_FORMATTER
			.formatToParts(value)
			.reduce((groups, { type, value }) => {
				if (type === groupName) groups.push(value);
				return groups;
			}, []);
	}

	/**
	 * @param {string} orders
	 * @param {string} joiner
	 * @param {{ single: string, plural: string }} groupOptions
	 */
	function toNomenclature(
		orders = "000",
		joiner = PORTUGUESE_DEFAULT_AGGREGATOR_WORD,
		groupOptions = PORTUGUESE_GROUPS_ENUM[0]
	) {
		orders = orders.padStart(3, "0");

		const num = Number.parseInt(orders, 10);
		const unit = num >= 2 ? groupOptions.plural : groupOptions.single;

		if (num === 0) { return "" }
		else if (num === 100) { return String.prototype.concat(joiner, " ", PortugueseDozensNamesMap.get("10"), " ", unit) }
		else if (num % 100 === 0) { return String.prototype.concat(joiner, " ", PortugueseHundredsNamesMap.get(orders[0]), " ", unit) }
		else {
			return orders
				.split("", 3)
				.map((digit, index, arr) => {
					switch (index) {
						case 0: return PortugueseHundredsNamesMap.get(digit).concat(digit !== "0" ? " " : "", joiner);
						case 1: return ["0", "1"].includes(digit) ? "" : PortugueseDozensNamesMap.get(digit);
						case 2: {
							if (arr[index - 1] === "1") return PortugueseUnitsNamesMap.get("1".concat(digit));
							else if (digit === "0" || arr[index - 1] === "0") return PortugueseUnitsNamesMap.get(digit);
							else return String.prototype.concat(joiner, " ", PortugueseUnitsNamesMap.get(digit));
						}
					}
				})
				.filter(value => Boolean(value))
				.join(" ")
				.concat(" ", unit);
		}
	}

	function converter(value = "") {
		if (value == 0) return "zero";
		return extractGroupsFromNumber(value, "integer")
			.map((orders, index, arr) => toNomenclature(orders, PORTUGUESE_DEFAULT_AGGREGATOR_WORD, PORTUGUESE_GROUPS_ENUM[arr.length - index - 1]))
			.join(" ")
			.trim()
			.replace(RegExp(`^${PORTUGUESE_DEFAULT_AGGREGATOR_WORD}\\s+`), "")
			.replace(/(^um mil\b)/, "mil");
	}

	return Object.freeze({ convert: converter.bind(PortugueseNumeralNomenclatureConverter) });
};

//// MAIN ////

function main() {
	const output = [];

	const { convert } = convertNumberToPortugueseNomenclature();

	for (const text of input) {
		if (text === "") break; // EOF
		output.push(convert(text));
	}

	console.log(output.join("\n"));
}

main();