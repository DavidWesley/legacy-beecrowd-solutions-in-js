const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let instanceIndex = 0; instanceIndex < +numCases; instanceIndex++) {
		const start = 3 * instanceIndex
		const end = start + 3

		const [, input, code] = lines.slice(start, end)
		const decodedText = BrainfuckIntepreter(code, input)

		responses.push(
			`Instancia ${instanceIndex + 1}`,
			`${decodedText}`,
			""
		)
	}

	console.log(responses.join("\n"))
}

main()

// Inspered By Code of Harley Jackson

/** @param {string} code */

function BrainfuckIntepreter(code, input = "") {
	const buff = new Uint8Array(new SharedArrayBuffer(3e4))
	const loops = new Array(0)
	const chars = new Array(0)

	// progamIndex | buffIndex | inputindex
	let [pIndex, bIndex, iIndex] = [0, 0, 0]

	// Reading code and starting some configurations
	for (pIndex = 0; pIndex < code.length; pIndex++) {
		if (code[pIndex] === "[") loops.push({ start: pIndex, end: null })

		else if (code[pIndex] === "]") {
			for (let l = loops.length - 1; l >= 0; l--) {
				if (loops[l].end == null) {
					loops[l].end = pIndex
					break
				}
			}
		}
	}

	// Interpreting BrianFuck Code
	for (pIndex = 0; pIndex < code.length; pIndex++) {
		switch (code[pIndex]) {
			case ">": bIndex = (buff.length + bIndex + 1) % buff.length; break
			case "<": bIndex = (buff.length + bIndex - 1) % buff.length; break

			case "+": Atomics.add(buff, bIndex, 1); break
			case "-": Atomics.sub(buff, bIndex, 1); break

			case ".": chars.push(buff[bIndex]); break
			case ",": Atomics.store(buff, bIndex, input.charCodeAt(iIndex++) || 0); break

			case "[": if (buff[bIndex] === 0) pIndex = loops.find((loop) => pIndex === loop.start).end; break
			case "]": if (buff[bIndex] !== 0) pIndex = loops.find((loop) => pIndex === loop.end).start; break

			case "#": chars.push(...buff.slice(0, 11)); break

			default: break
		}
	}

	return String.fromCharCode(...chars)
}