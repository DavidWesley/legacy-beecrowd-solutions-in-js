const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")


class CPF {
	/** @param {number[]} ints */
	static generateFromIntegers(ints) {
		const digits = new Uint8Array(11)

		let res01 = 0
		let res02 = 0

		for (let index = 0; index < 9; index++) {
			digits.set([ints[index] || 0], index)

			res01 += (index + 1) * digits[index]
			res02 += (9 - index) * digits[index]
		}

		digits[9] = (res01 % 11) % 10
		digits[10] = (res02 % 11) % 10

		return digits.join("")
	}

	/** @param {string} cpf*/
	static format(cpf) {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
	}
}


function main() {
	const responses = []

	for (const line of input) {
		if (line === "") break // EOFile
		const generated = CPF.generateFromIntegers([...line].map(Number))
		const formatted = CPF.format(generated)

		responses.push(formatted)
	}

	console.log(responses.join("\n"))
}

main()