const { readFileSync } = require("fs")
const inputKeys = readFileSync("./dev/stdin", "utf8").split('\n')

function validateKey(inputKey = '') {
	const defaultPassword = '2002'
	return inputKey === defaultPassword
}

function main() {
	const responses = []

	while (true) {
		const valid = validateKey(inputKeys.shift())

		if (valid) { responses.push("Acesso Permitido"); break }
		else { responses.push("Senha Invalida") }
	}

	console.log(responses.join('\n'))
}

main()