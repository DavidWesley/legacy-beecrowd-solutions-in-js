const { createHash } = require("node:crypto")
const { readFileSync } = require("node:fs")

const input = readFileSync("/dev/stdin", "utf8").split("\n")

const validatePassword = (() => {
	const ALGORITHM = "sha256"
	const INPUT_ENCODING = "ascii"
	const OUTPUT_ENCODING = "base64"
	const CORRECT_HASH = "bJTjXMw1LU6e8LmVYs/5laV0HOjeitEbVoiSk02u42Y=" // Hard Coded correct password in base64 format

	const hash = createHash(ALGORITHM).setEncoding(INPUT_ENCODING)

	return (pass = "") => CORRECT_HASH === hash
		.copy()
		.update(pass)
		.digest(OUTPUT_ENCODING)
})()

function main() {
	const output = []

	for (const password of input) {
		if (validatePassword(password)) {
			output.push("Acesso Permitido")
			break
		} else output.push("Senha Invalida")
	}

	console.log(output.join("\n"))
}

main()
