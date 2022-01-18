const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", { encoding: "utf8" }).split("\n")

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)

function main() {
	const responses = []

	for (let index = 0; index < +numCases; index++) {
		const numInstrunctions = Number.parseInt(input.next().value, 10)
		const instrunctionsList = new Array(numInstrunctions)

		let position = 0

		for (let j = 0; j < numInstrunctions; j++) {
			const command = input.next().value ?? ""

			instrunctionsList[j] = /SAME AS (\d+)/.test(command)
				? instrunctionsList[+/SAME AS (\d+)/.exec(command)[1] - 1]
				: command

			switch (instrunctionsList[j]) {
				case "LEFT": position--; break
				case "RIGHT": position++; break
				default: break
			}
		}

		responses.push(position)
	}

	console.log(responses.join("\n"))
}

main()