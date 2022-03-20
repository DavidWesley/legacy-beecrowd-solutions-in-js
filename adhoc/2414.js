const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(" ")

function main() {
	let max = Number.NEGATIVE_INFINITY

	for (const num of input)
		if (num == "0") break
		else if (Number(num) > max) max = Number(num)

	console.log(max)
}

main()