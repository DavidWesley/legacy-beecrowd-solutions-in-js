const { readFileSync } = require("fs")
const passwordList = readFileSync("/dev/stdin", "utf8").split("\n") //=

const numbersRegex = /\d+/gi
const vowelsRegex = /[aeiou]/gi
const consonantsRegex = /(?![aeiou])[a-z]/gi

const upperCaseRegex = /[A-Z]+/
const lowerCaseRegex = /[a-z]+/

const invalidCharsRegex = /[\W_]/gi

const hasNumber = (str = "") => RegExp(numbersRegex, "i").test(str)

const hasVowel = (str = "") => RegExp(vowelsRegex, "i").test(str)
const hasConsonant = (str = "") => RegExp(consonantsRegex, "i").test(str)
const hasEspecialChars = (str = "") => RegExp(invalidCharsRegex, "i").test(str)

const hasUppercase = (str = "") => RegExp(upperCaseRegex, "").test(str)
const hasLowercase = (str = "") => RegExp(lowerCaseRegex, "").test(str)

const hasValidLength = (str = "") => str.length >= 6 && str.length <= 32

/** @typedef {(str: string) => Boolean} conditionalFunction */

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
			yes: [hasVowel, hasConsonant, hasNumber, hasUppercase, hasLowercase, hasValidLength],
			no: [hasEspecialChars],
		})

		return valid ? 'Senha valida.' : 'Senha invalida.'
	})

	console.log(responses.join("\n"))
}

main()