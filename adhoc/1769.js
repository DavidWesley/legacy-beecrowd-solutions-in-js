const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

class CPF {
	/** @param {string} cpf */
	static validate(cpf) {
		const arr = cpf
			.match(/\d/g)
			.slice(0, 11)
			.map((code) => Number.parseInt(code, 10))

		let res01 = 0
		let res02 = 0

		for (let index = 0; index < 9; index++) {
			res01 += (index + 1) * arr[index]
			res02 += (9 - index) * arr[index]
		}

		return (res01 % 11) % 10 == arr[9] && (res02 % 11) % 10 == arr[10]
	}
}

function main() {
	const responses = []

	for (const line of input)
		if (line == "") break
		else responses.push(CPF.validate(line) ? "CPF valido" : "CPF invalido")

	console.log(responses.join("\n"))
}

main()
