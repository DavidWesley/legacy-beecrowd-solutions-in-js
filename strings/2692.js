const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const output = []
	const mockingKeyboardMap = new Map()

	const [N, M] = input
		.shift()
		.split(" ", 2)
		.map((value) => Number.parseInt(value, 10))

	for (const line of input.splice(0, N)) {
		const [from, to] = line.split(" ", 2).map((c) => c.charAt(0))
		mockingKeyboardMap.set(from, to)
		mockingKeyboardMap.set(to, from)
	}

	let pos = 0
	let text = ""

	for (const str of input.splice(0, M)) {
		if (str === "") continue
		const chars = [...str]

		for (let i = 0; i < chars.length; i += 1) {
			const char = chars[i]
			if (mockingKeyboardMap.has(char)) chars[i] = mockingKeyboardMap.get(char)
		}

		text = chars.join("")
		pos = output.push(text)
	}

	output.length = M
	output.fill(text, pos)

	console.log(output.join("\n"))
}

main()
