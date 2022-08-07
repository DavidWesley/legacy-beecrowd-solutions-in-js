const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(BigInt)


function main() {
	const output = []

	for (const num of input) {
		if (num === - 1n) break
		else output.push(num === 0n ? 0n : num - 1n)
	}

	console.log(output.join("\n"))
}

main()