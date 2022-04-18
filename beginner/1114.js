const { readFileSync } = require("fs")
const inputKeys = readFileSync("/dev/stdin", "utf8").split("\n")

function validateKey(inputKey = "") {
	const DAFULT_PASS = "2002"
	return inputKey === DAFULT_PASS
}

function main() {
	const responses = []

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const valid = validateKey(inputKeys.shift())

		if (valid) { responses.push("Acesso Permitido"); break }
		else { responses.push("Senha Invalida") }
	}

	console.log(responses.join("\n"))
}

main()