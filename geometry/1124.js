const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

//// READING FILE | STREAMS ////
class LineReader {
	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("node:readline").ReadLine}
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
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 */
	static create(path, encoding) {
		const RLI = LineReader.createReadLineInterface(path, encoding)

		let EOF = false

		const nextLineGenerator = (async function* () {
			for await (const line of RLI)
				yield line
		})()

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

class Point {
	/**
	 * @param { number | bigint | string } x
	 * @param { number | bigint | string } y
	 */
	constructor(x, y) {
		this.x = Number.parseFloat(x.toString(10))
		this.y = Number.parseFloat(y.toString(10))
	}

	toString() {
		return `(${this.x}, ${this.y})`
	}
}

class Coordinates {
	/**
	 * @param {Point} pA
	 * @param {Point} pB
	 */
	static distance2D(pA, pB) {
		const dx = pA.x - pB.x
		const dy = pA.y - pB.y

		return Math.hypot(dx, dy)
	}
}

/**
 * @param {number} H
 * @param {number} W
 * @param {number} R1
 * @param {number} R2
 */
function fitInTheElevator(H, W, R1, R2) {
	const [D1, D2] = [R1, R2].map((r) => r * 2)

	if (Math.min(D1, D2) > Math.max(H, W)) return false
	if (Math.max(D1, D2) > Math.min(H, W)) return false

	if ((R1 + R2) * (1 + Math.SQRT2) <= Math.hypot(H, W)) return true
	if (Math.sqrt(4.0 * R1 * R2) + (R1 + R2) <= Math.max(H, W)) return true

	const C1 = new Point(R1, R1)
	const C2 = new Point(W - R2, H - R2)

	return Coordinates.distance2D(C1, C2) >= R1 + R2
}

//// MAIN ////
async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => line.split(" ", 4).map(value => Number.parseInt(value, 10))
	const nextLine = lineReader.nextLine.bind(lineReader, helper)

	while (lineReader.hasNextLine()) {
		const [H, W, R1, R2] = await nextLine()
		if ([H, W, R1, R2].every(x => x === 0)) break
		else output.push(fitInTheElevator(H, W, R1, R2) ? "S" : "N")
	}

	console.log(output.join("\n"))
}

main()
