//// READING FILE | STREAMS ////
const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

const PATH = "/dev/stdin"
const ENCODING = "utf8"

/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */
function createReadLineInterface(path, encoding) {
	return createInterface({
		input: createReadStream(path, encoding),
		crlfDelay: Infinity,
		terminal: false
	})
}


/** @param {import("readline").Interface} readLineInterface */
const processLineByLine = function (readLineInterface) {
	let EOF = false

	const nextLineGenerator = (async function* () {
		for await (const line of readLineInterface) yield line
		EOF = true
	})()

	return {
		hasNextLine: () => !EOF,
		nextLine: async (fn) => {
			const { value } = (await nextLineGenerator.next())
			return (typeof fn === "function") ? fn(value) : value
		}
	}
}


async function main() {
	const output = []

	const RLI = createReadLineInterface(PATH, ENCODING)
	const readLineInstance = processLineByLine(RLI)
	const nextLine = readLineInstance.nextLine.bind(undefined, (n = "") => n.split(" ").map(value => Number.parseInt(value, 10)))

	while (readLineInstance.hasNextLine()) {
		const [N, M] = await nextLine()

		const tableA = Array.from({ length: N })
		const tableB = Array.from({ length: N }, () => new Array(M))

		for (let index = 0; index < N; index++)
			tableA[index] = (await nextLine()).slice(0, M)

		for (let i = 0; i < N; i++) {
			for (let j = 0; j < M; j++) {
				if (tableA[i][j] === 1)
					tableB[i][j] = 9
				else if (tableA[i][j] === 0)
					tableB[i][j] = Number(tableA[i][Math.max(j - 1, 0)] === 1) // HORIZONTAL RIGHT
						+ Number(tableA[i][Math.min(M - 1, j + 1)] === 1) // HORIZONTAL LEFT
						+ Number(tableA[Math.max(i - 1, 0)][j] === 1) // VERTICAL UP
						+ Number(tableA[Math.min(N - 1, i + 1)][j] === 1) // VERTICAL DOWN
				else
					throw new Error(`Invalid value in input: ${tableA[i][j]}`)
			}

			output.push(tableB[i].join(""))
		}
	}

	console.log(output.join("\n"))
}

main()