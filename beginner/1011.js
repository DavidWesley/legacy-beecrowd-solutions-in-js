
const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))
const calculateSphereVolumeFromRadius = (R = 0, pi = Math.PI) => pi * (4 / 3) * Math.pow(R, 3)

function main() {
	const radius = input.at(0)
	const PI = Float(Math.PI, 5)
	const volume = calculateSphereVolumeFromRadius(radius, PI)

	console.log("VOLUME = %S", volume.toFixed(3))
}

main()
