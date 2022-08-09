const { readFileSync } = require("fs")
const [Ca, Ba, Pa, Cr, Br, Pr] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 6)
	.map(value => Number.parseInt(value, 10))

console.log(
	"%d",
	Math.max(0, Cr - Ca) +
	Math.max(0, Br - Ba) +
	Math.max(0, Pr - Pa)
)