const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const RegexesEnum = {
	numbers: /\d+/gi,
	vowels: /[aeiou]/gi,
	consonants: /(?![aeiou])[a-z]/gi,
	upperCase: /[A-Z]+/,
	lowerCase: /[a-z]+/,
	specialChars: /[\W_]/gi,
}

const RegExpComparativeFunctionGenerator = Object.freeze({
	/**
	 * @param {string | RegExp} regex
	 */
	has(regex, flags = "") {
		return (str = "") => RegExp(regex, flags).test(str)
	}
})

const Has = Object.freeze({
	Digit: RegExpComparativeFunctionGenerator.has(RegexesEnum.numbers, "i"),
	Vowel: RegExpComparativeFunctionGenerator.has(RegexesEnum.vowels, "i"),
	Consonant: RegExpComparativeFunctionGenerator.has(RegexesEnum.consonants, "i"),
	SpecialChars: RegExpComparativeFunctionGenerator.has(RegexesEnum.specialChars, "i"),
	Uppercase: RegExpComparativeFunctionGenerator.has(RegexesEnum.upperCase),
	Lowercase: RegExpComparativeFunctionGenerator.has(RegexesEnum.lowerCase),
})

/**
 * @typedef {ReturnType<typeof RegExpComparativeFunctionGenerator.has>} conditionalFunction
 * @param {string} password
 * @param {{yes: conditionalFunction[], no: conditionalFunction[]}} conditions
 */
function validatePassword(password, conditions) {
	return conditions.yes.every(condition => condition(password)) && conditions.no.some(condition => !condition(password))
}

function main() {
	const output = input.map(password => {
		return validatePassword(password, {
			yes: [
				Has.Vowel,
				Has.Consonant,
				Has.Digit,
				Has.Uppercase,
				Has.Lowercase,
				(str = "") => str.length >= 6 && str.length <= 32
			],
			no: [Has.SpecialChars]
		}) ? "Senha valida." : "Senha invalida."
	})

	console.log(output.join("\n"))
}

main()
