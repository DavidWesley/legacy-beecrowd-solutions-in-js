const { readFileSync } = require("fs")
const input = readFileSync('/dev/stdin', "utf8")
	.split('\n')
	.map(line => line.split(' '))

const toRad = (degree) => Number.parseFloat(degree) * (Math.PI / 180.0)

function sphericalCoordinates(radius, la, lo) {
	const cos = Math.cos
	const sin = Math.sin

	const phi = toRad(la)
	const theta = toRad(lo)

	const r = Number.parseFloat(radius)

	let x = Math.abs(r * cos(phi) * sin(theta))
	let y = Math.abs(r * sin(phi))
	let z = Math.abs(r * cos(phi) * cos(theta))

	if (lo < 0 && Math.round(1000 * x) >= 5) x *= -1
	if (la < 0 && Math.round(1000 * y) >= 5) y *= -1
	if (Math.abs(lo) < 90 && Math.round(1000 * z) >= 5) z *= -1

	return { x, y, z }
}

function main() {
	const responses = []

	for (const [R, La, Lo] of input) {
		if ([R, La, Lo].includes('')) break // EOFile Condition Verification

		const { x, y, z } = sphericalCoordinates(R, La, Lo)
		responses.push(`${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)}`)
	}

	console.log(responses.join("\n"))
}

main()