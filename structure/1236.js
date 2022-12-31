const { stdout } = require("node:process")
const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "ascii").split("\n")

/** @param { string | number | number[] } value */
function print(value) {
	let buffer

	if (typeof value === "string") buffer = Buffer.from(value, "ascii")
	else if (typeof value === "number" && Number.isSafeInteger(value)) buffer = Buffer.from([value])
	else if (Array.isArray(value) && value.every((v) => typeof v === "number")) buffer = Buffer.from(value.join(""), "ascii")

	if (Buffer.isBuffer(buffer)) stdout.write(buffer)
}

function main() {
	const MAX_OCCURRENCES_BLOCK_SIZE = 255

	/**
	 * @typedef { "SPACE" | "ZERO" } CompressibleCharsType
	 * @typedef { Readonly<{ [T in CompressibleCharsType]: string }> } A
	 */
	const /** @type {A} */ CompressibleCharsEnum = Object.freeze({ ZERO: "0", SPACE: " " })
	const /** @type {A} */ CompressionSymbolsEnum = Object.freeze({ ZERO: "#", SPACE: "$" })

	for (let i = 0, j = 0; i < Number.parseInt(N, 10); i += 1, j = 0) {
		const str = input.at(i).substring(0, 2000)

		while (j < str.length) {
			const char = str.charAt(j)
			switch (char) {
				case CompressibleCharsEnum.ZERO: {
					let count = 0
					while (str.charAt(j) === char && count < MAX_OCCURRENCES_BLOCK_SIZE) { j++; count++ }
					if (count > 2) { print(CompressionSymbolsEnum.ZERO); print(count) }
					else { print(CompressibleCharsEnum.ZERO.repeat(count)) }
					break
				}
				case CompressibleCharsEnum.SPACE: {
					let count = 0
					while (str.charAt(j) === char && count < MAX_OCCURRENCES_BLOCK_SIZE) { j++; count++ }
					if (count > 2) { print(CompressionSymbolsEnum.SPACE); print(count) }
					else { print(CompressionSymbolsEnum.SPACE.repeat(count)) }
					break
				}
				default:
					print(str.charAt(j++)); break
			}
		}

		print("\n")
	}
}

main()
