const { createReadStream } = require("fs")
const { createInterface } = require("readline")

class LineReader {
	/**
	 * @param {import("fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("readline").ReadLine}
	 */
	static createReadLineInterface(path, encoding = "utf8") {
		const readStreamOptions = {
			encoding: encoding,
			flags: "r",
			emitClose: true,
			autoClose: true
		}

		return createInterface({
			input: createReadStream(path, readStreamOptions),
			crlfDelay: Infinity,
			terminal: false
		})
	}

	/**
	 * @param {import("fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @param {boolean} split To split spaces into line
	 */
	static create(path, encoding, split = false) {
		const RLI = LineReader.createReadLineInterface(path, encoding)

		let EOF = false

		const nextLineGenerator = (async function* (split) {
			for await (const line of RLI) {
				yield line
			}
		})(split)

		RLI.once("close", () => { EOF = true })

		return {
			hasNextLine: () => !EOF,
			nextLine: async (/** @type {unknown} */ fn) => {
				const { value } = (await nextLineGenerator.next())
				return (typeof fn === "function") ? fn(value) : value
			},
			close: () => RLI.close()
		}
	}
}

function simplePolynomialDerivation(equation = "") {
	return equation
		.replace(/\b(\d+)\b/g, "$1x0")
		.replace(/(\d*)([a-zA-Z])(\d*)/g, (_, cof, variable, exp) => {
			if (cof === "") cof = "1"
			if (exp === "") exp = "1"

			const derivedCoefficient = Number.parseInt(cof, 10) * Number.parseInt(exp, 10)
			const derivedExponent = Number.parseInt(exp, 10) - 1

			switch (exp) {
				case "0": case "1":
					return String.prototype.concat(derivedCoefficient)
				case "2":
					return String.prototype.concat(derivedCoefficient, variable)
				default:
					return String.prototype.concat(derivedCoefficient, variable, derivedExponent)
			}
		})
}

async function main() {
	const PATH = "/dev/stdin"
	/** @type {BufferEncoding} */
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING, true)

	while (lineReader.hasNextLine()) {
		const T = Number.parseInt(await lineReader.nextLine(), 10)
		const polynomialEquation = await lineReader.nextLine()

		if (Number.isNaN(T)) break // EOF
		output.push(simplePolynomialDerivation(polynomialEquation))
	}

	if (lineReader.hasNextLine()) lineReader.close()

	console.log(output.join("\n"))
}

main()