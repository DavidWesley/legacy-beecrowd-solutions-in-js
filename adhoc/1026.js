const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(/\s+/g)

/** @typedef { number | bigint | string } anyNumberType */

const Long = {
	/**
	 * @param { anyNumberType } numA
	 * @param { anyNumberType } numB
	*/
	xor: (numA, numB, bits = 32) => {
		numA = BigInt.asUintN(bits, BigInt(numA))
		numB = BigInt.asUintN(bits, BigInt(numB))

		return numA ^ numB
	}
}

function main() {
	const output = []

	for (let index = 0; index < input.length; index += 2) {
		const v1 = input[index]
		const v2 = input[index + 1]

		if (v1 == "" || v2 == "") break

		output.push(Long.xor(v1, v2))
	}

	console.log(output.join("\n"))
}

main()