const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1 + 1e3)

const output = Array.from(
	{ length: Number.parseInt(N, 10) },
	(_, index) => {
		return BigInt(input[index])
			.toString(2)
			.split(/0+/g)
			.sort((a, b) => a.length - b.length)
			.pop()
			.length
	}
)

console.log(output.join("\n"))
