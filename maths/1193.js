const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2))


const ConvertBase = (num) => ({
	from: (baseFrom) => ({
		to: (baseTo) => Number.parseInt(num, baseFrom).toString(baseTo)
	})
})

const radices = Object.freeze({
	dec: 10,
	hex: 16,
	bin: 2
})


function main() {
	const output = []

	for (let index = 0; index < Number.parseInt(numLines, 10); index++) {
		output.push(`Case ${index + 1}:`)

		const [num, code] = lines[index]
		const convertNum = ConvertBase(num)

		for (const radix in radices) {
			if (code === radix) continue

			const baseFrom = radices[code]
			const baseTo = radices[radix]
			const converted = convertNum.from(baseFrom).to(baseTo)

			output.push(`${converted} ${radix}`)
		}

		output.push("")
	}

	console.log(output.join("\n"))
}

main()