const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

function main() {
	const monthIndex = input[0]
	const LongNameMonth = new Date(`2021-${monthIndex}-1`).toLocaleDateString("en-us", { month: "long" })

	console.log(LongNameMonth)
}

main()