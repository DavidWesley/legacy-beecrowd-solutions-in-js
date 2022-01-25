const { readFileSync } = require("fs")
const [size, ...nums] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map(value => Number.parseInt(value))

function main() {
	const values = nums.slice(0, size)
	const min = Reflect.apply(Math.min, null, values)
	const pos = values.indexOf(min) + 1

	console.log(pos)
}

main()