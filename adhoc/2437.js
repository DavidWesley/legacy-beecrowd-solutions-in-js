const { readFileSync } = require("fs")
const [Xm, Ym, Xr, Yr] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 4)
	.map((value) => Number.parseInt(value, 10))

const Xdist = Math.abs(Xm - Xr)
const Ydist = Math.abs(Ym - Yr)

console.log(Xdist + Ydist)