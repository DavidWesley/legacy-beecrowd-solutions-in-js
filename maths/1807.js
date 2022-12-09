const { readFileSync } = require("node:fs")
const [R] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(BigInt)

/**
 * Right-to-left binary method to
 * [Fast Modular ](https://en.wikipedia.org/wiki/Modular_exponentiation)
 * @param {bigint} base
 * @param {bigint} exponent
 * @param {bigint} mod
 */
const bigIntModularExponentiation = (base, exponent, mod) => {
	if (mod === 1n) return 0n
	let result = 1n
	base = base % mod

	while (exponent > 0) {
		if (exponent % 2n === 1n) result = (result * base) % mod
		exponent = exponent / 2n
		base = (base * base) % mod
	}

	return result
}

const MOD = BigInt(2 ** 31 - 1)

console.log(bigIntModularExponentiation(3n, R, MOD).toString(10))
