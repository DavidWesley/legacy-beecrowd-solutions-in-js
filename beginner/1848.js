const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const output = []

	for (let index = 0, sum = 0; index < input.length; index += 1) {
		const line = input[index]

		if (line === "") break // EOFile Condition
		if (line === "caw caw") {
			output.push(sum)
			sum = 0
			continue
		}

		const bin = line
			.replace(/\*/g, "1")
			.replace(/-/g, "0")

		sum += Number.parseInt(bin, 2)
	}

	console.log(output.join("\n"))
}

main()
