const { readFileSync } = require("fs")
const [x1, y1, x2, y2, x3, y3, x4, y4] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/g, 8)
	.map((value) => Number.parseInt(value, 10))

function main() {
	if (x4 < x1 || x3 > x2) console.log(0)
	else if (y4 < y1 || y3 > y2) console.log(0)
	else console.log(1)
}

main()