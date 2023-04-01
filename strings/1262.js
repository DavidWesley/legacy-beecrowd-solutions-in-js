const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function countMinimumNeededMachineCycles(operations = "", type, size = 1) {
	const reg = new RegExp(`${type}{1,${size}}`, "gi")
	return operations.replace(reg, type).length
}

function main() {
	const output = []

	for (let index = 0; index < input.length; index += 2) {
		const processes = input[index + 0]
		const simultaneousProcessesSize = Number.parseInt(input[index + 1], 10)

		if (processes === "" || Number.isNaN(simultaneousProcessesSize)) break // EOF

		output.push(countMinimumNeededMachineCycles(processes, "R", simultaneousProcessesSize))
	}

	console.log(output.join("\n"))
}

main()