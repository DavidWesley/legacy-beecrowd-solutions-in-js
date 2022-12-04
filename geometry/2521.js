const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 3).map(Number.parseFloat))

const toRad = (degree) => degree * (Math.PI / 180.0)

function sphericalCoordinates(radius, la, lo) {
	const r = radius
	const phi = toRad(la)
	const theta = toRad(lo)

	let x = Math.abs(r * Math.cos(phi) * Math.sin(theta))
	let y = Math.abs(r * Math.sin(phi))
	let z = Math.abs(r * Math.cos(phi) * Math.cos(theta))

	if (lo < 0 && Math.round(1000 * x) >= 5) x *= -1
	if (la < 0 && Math.round(1000 * y) >= 5) y *= -1
	if (Math.abs(lo) < 90 && Math.round(1000 * z) >= 5) z *= -1

	return { x, y, z }
}

function main() {
	const output = []

	for (const [R, La, Lo] of input) {
		if ([R, La, Lo].some(Number.isNaN)) break // EOF
		else output.push(Object.values(sphericalCoordinates(R, La, Lo)).map(v => v.toFixed(2)).join(" "))
	}

	console.log(output.join("\n"))
}

main()
