const { readFileSync } = require("fs")
const passwordList = readFileSync("/dev/stdin", "utf8").split("\n")

const RegexesEnum = {
	numbers: /\d+/gi,
	vowels: /[aeiou]/gi,
	consonants: /(?![aeiou])[a-z]/gi,
	upperCase: /[A-Z]+/,
	lowerCase: /[a-z]+/,
	specialChars: /[\W_]/gi,
}

class RegExpComparativeFunctionGenerator {
	static has(regex, flags = "") {
		return (str = "") => RegExp(regex, flags).test(str)
	}
}

class Has {
	static Number = RegExpComparativeFunctionGenerator.has(RegexesEnum.numbers, "i")

	static Vowel = RegExpComparativeFunctionGenerator.has(RegexesEnum.vowels, "i")
	static Consonant = RegExpComparativeFunctionGenerator.has(RegexesEnum.consonants, "i")
	static SpecialChars = RegExpComparativeFunctionGenerator.has(RegexesEnum.specialChars, "i")

	static Uppercase = RegExpComparativeFunctionGenerator.has(RegexesEnum.upperCase)
	static Lowercase = RegExpComparativeFunctionGenerator.has(RegexesEnum.lowerCase)

	static ValidLength = (str = "") => str.length >= 6 && str.length <= 32
}

/** @typedef {ReturnType<RegExpComparativeFunctionGenerator.has>} conditionalFunction  */

/**
 * @param {string} password
 * @param {{yes: conditionalFunction[], no: conditionalFunction[]}} conditions
 */

function validatePassword(password, conditions) {
	return conditions.yes.every(condition => condition(password)) && conditions.no.some(condition => !condition(password))
}

function main() {
	const responses = passwordList.map(password => {
		const valid = validatePassword(password, {
			yes: [Has.Vowel, Has.Consonant, Has.Number, Has.Uppercase, Has.Lowercase, Has.ValidLength],
			no: [Has.SpecialChars],
		})

		return valid ? "Senha valida." : "Senha invalida."
	})

	console.log(responses.join("\n"))
}

main()