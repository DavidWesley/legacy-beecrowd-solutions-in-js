const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(Number.parseFloat)

const max = (values = [0]) => Reflect.apply(Math.max, null, values)

function main() {
	const bigger = max(input)
	console.log("%d eh o maior", bigger)
}

main()
