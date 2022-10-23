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

const MyMath = Object.create(Math, {
	avg: {
		/** @param {number[]} nums */
		value: function (...nums) {
			return nums.reduce((sum, value) => sum + value, 0) / nums.length
		},
		configurable: false,
		enumerable: false,
		writable: false
	},
	gcd: {
		/**
		 * @param {number} x
		 * @param {number} y
		 */
		value: function (x, y) {
			if (isNaN(x) || isNaN(y)) return Number.NaN
			x = Math.abs(x)
			y = Math.abs(y)
			while (y) [x, y] = [y, x % y]
			return x
		},
		configurable: false,
		enumerable: false,
		writable: false
	},
	lcm: {
		/** @param {number[]} nums */
		value: function (...nums) {
			if (nums.includes(0)) return 0
			return nums.reduce((lcm, value) => (lcm * value) / this.gcd(value, lcm))
		},
		configurable: false,
		enumerable: false,
		writable: false
	},
	toRad: {
		/** @param {number} degree */
		value: function (degree) {
			return degree * (Math.PI / 180)
		},
		configurable: false,
		enumerable: false,
		writable: false
	}
})

async function main() {
	const PATH = "/dev/stdin"
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING)

	const helper = (line = "") => line.split(" ", 3).map(value => Number.parseInt(value, 10))
	const nextLine = lineReader.nextLine.bind(undefined, helper)

	while (lineReader.hasNextLine()) {
		const [N, A, B] = await nextLine()
		if (N == 0 && A == 0 && B === 0) break

		const coloredTilesQuantity =
			Math.floor(N / A) +
			Math.floor(N / B) -
			Math.floor(N / MyMath.lcm(A, B))

		output.push(coloredTilesQuantity)
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()
